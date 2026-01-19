export default function registerAnimationSequence() {
  AFRAME.registerComponent("animation-sequence", {
    schema: {
      entities: { type: "array" },
    },

    init() {
      this.ents = this.data.entities.map((sel) => document.querySelector(sel));
      this.currentIndex = 0;
      this.sequenceStarted = false;
      this.sequenceCompleted = false;
      this._onAnimFinished = null;

      // ✅ camera / target start control
      this.cameraopen = false;

      const scene = this.el.sceneEl;

      scene.addEventListener("loaded", () => {
        console.log("🎬 Scene fully loaded.");

        // ❌ DO NOT start targets here
        // this.setupSequence();

        // ✅ Wait for Start button click
        this.waitForStartClick();
      });
    },

    // ✅ NEW FUNCTION
    waitForStartClick() {
      const startBtn = document.getElementById("startBtn"); // your button id
      const loadingScreen = document.getElementById("loadingScreen"); // your loading div id

      // Pause camera first
      if (window.XR8) XR8.pause();

      this.cameraopen = false;
      console.log("📷 Camera Open:", this.cameraopen);

      if (!startBtn) {
        console.warn("⚠️ startBtn not found! starting directly...");
        this.startExperience();
        return;
      }

      startBtn.style.display = "block";

      startBtn.addEventListener(
        "click",
        () => {
          console.log("✅ START button clicked");

          // Resume camera
          if (window.XR8) XR8.resume();

          this.cameraopen = true;
          console.log("📷 Camera Open:", this.cameraopen);

          // Hide loading UI
          if (loadingScreen) loadingScreen.style.display = "none";

          // ✅ NOW start image target + sequence
          this.startExperience();
        },
        { once: true }
      );
    },

    // ✅ NEW FUNCTION
    startExperience() {
      console.log("🎯 Starting Image Target System...");
      this.setupSequence();
    },

    setupSequence() {
      const showTarget = window.location.pathname.replace("/", "");

      const validTargets = [
        "chocos1",
        "moons_stars",
        "doet",
        "chhota_laddoo",
        "crunchy_bites",
      ];

      if (!showTarget) {
        console.error("❌ Target not found in URL");
      } else if (!validTargets.includes(showTarget)) {
        console.error("❌ Invalid target:", showTarget);
      } else {
        console.log("✅ Valid Target:", showTarget);

        const imgEl = document.getElementById("target-img");
        if (imgEl) imgEl.src = `/assets/images/targets/${showTarget}.png`;
      }

      // Hide all targets first
      document.querySelectorAll("xrextras-named-image-target").forEach((t) => {
        t.setAttribute("enabled", false);
        t.style.display = "none";
      });

      // Enable only matched target
      if (validTargets.includes(showTarget)) {
        const targetEl = document.getElementById(showTarget);
        if (targetEl) {
          targetEl.style.display = "block";
          targetEl.setAttribute("enabled", true);
          console.log("🎯 Showing target:", showTarget);
        }
      }

      console.log("✅ Animation sequence ready.");

      const uiscreen = document.getElementById("ui-screen");
      const imageTarget = this.el.closest("xrextras-named-image-target");
      const scene = this.el.sceneEl;

      const onFound = () => {
        console.log("🟢 Image found!");

        if (uiscreen) {
          uiscreen.style.transition = "opacity 0.3s ease";
          uiscreen.style.opacity = "0";
          setTimeout(() => {
            uiscreen.style.display = "none";
          }, 300);
        }

        if (!this.sequenceStarted) {
          this.sequenceStarted = true;
          this.chainAnimations();
        } else if (!this.sequenceCompleted) {
          this.resumeAll();
        }
      };

      const onLost = () => {
        console.log("⏸️ Image lost.");

        if (uiscreen) {
          uiscreen.style.display = "flex";
          setTimeout(() => {
            uiscreen.style.transition = "opacity 0.3s ease";
            uiscreen.style.opacity = "1";
          }, 10);
        }

        if (!this.sequenceCompleted) this.pauseAll();
      };

      if (imageTarget) {
        imageTarget.addEventListener("xrimagefound", onFound);
        imageTarget.addEventListener("xrimagelost", onLost);
      }

      scene.addEventListener("xrimagefound", onFound);
      scene.addEventListener("xrimagelost", onLost);
    },

    playEntity(index) {
      this.ents.forEach((e, i) => e.setAttribute("visible", i === index));
      const entity = this.ents[index];
      if (!entity) return;

      if (index === 0) {
        const soundComp = entity.components.sound;
        if (soundComp) {
          soundComp.stopSound();
          soundComp.playSound();
          console.log("🔊 anim1 audio started");
        }
      }

      if (index === 1) {
        const specialElement = document.querySelector(".yellow-card");
        if (specialElement) {
          specialElement.style.display = "block";
          console.log("🎉 Yellow card visible at animation index 2");
        }
      }

      const onModelLoaded = () => {
        const mixerComp = entity.components["animation-mixer"];
        if (mixerComp && mixerComp.mixer) {
          const { mixer } = mixerComp;
          mixer.stopAllAction();
          mixer.timeScale = 1;

          const actions = Object.values(mixer._actions);
          if (actions.length > 0) {
            actions[0].reset().play();
            console.log(`🎥 Playing animation ${index + 1}`);
          }
        }
      };

      if (entity.hasLoaded) onModelLoaded();
      else entity.addEventListener("model-loaded", onModelLoaded, { once: true });
    },

    pauseAll() {
      this.ents.forEach((e) => {
        const m = e.components["animation-mixer"];
        if (m && m.mixer) m.mixer.timeScale = 0;
      });
      console.log("⏸️ Animations paused.");
    },

    resumeAll() {
      this.ents.forEach((e) => {
        const m = e.components["animation-mixer"];
        if (m && m.mixer) m.mixer.timeScale = 1;
      });
      console.log("▶️ Animations resumed.");
    },

    chainAnimations() {
      if (this.sequenceCompleted) return;

      const current = this.ents[this.currentIndex];
      const comp = current.components["animation-mixer"];
      if (!comp || !comp.mixer) return;

      const { mixer } = comp;

      if (this._onAnimFinished)
        mixer.removeEventListener("finished", this._onAnimFinished);

      this._onAnimFinished = () => {
        this.currentIndex++;
        if (this.currentIndex < this.ents.length) {
          this.playEntity(this.currentIndex);
          this.chainAnimations();
        } else {
          this.sequenceCompleted = true;
          console.log("🏁 All animations finished successfully!");
        }
      };

      mixer.addEventListener("finished", this._onAnimFinished);
      this.playEntity(this.currentIndex);
    },
  });
}
