


export function hideElement(element, time) {

    element.style.visibility = 'hidden'

    element.style.opacity = '0'

    if (time || time == 0) {

        setTimeout(() => {

            element.style.display = 'none'

        }, time)

    }

}

export function showElement(element, time, displayType) {

    if (time || time == 0) { element.style.display = displayType ? displayType : 'block' }

    setTimeout(() => {

        element.style.visibility = 'visible'

        element.style.opacity = '1'

    }, time || 0)

}



export function start(){

const assets = document.getElementById("assets")
const loadingScreen = document.getElementById("loadingScreen")
const languageSelectScreen = document.getElementById("languageSelectScreen")
const progressText = document.getElementById("progressText");




// assets.addEventListener("loaded", () => {    
//   // when fully loaded
//   setTimeout(() => {
//      hideElement(loadingDeepContainer, 0)
//     showElement(startBtn, 100);

//   }, 800);
// });

      let totalAssets = assets.children.length;
      let loadedAssets = 0;

let currentPercent = 0; // tracks displayed percent
   

      Array.from(assets.children).forEach((asset) => {
        if (asset.tagName === "IMG" || asset.tagName === "VIDEO") {
          asset.addEventListener("loadeddata", handleAssetLoaded);
          asset.addEventListener("loaded", handleAssetLoaded);
          asset.addEventListener("error", handleAssetLoaded);
        } else {
          loadedAssets++;
             updateProgress();
        }
      });

      function handleAssetLoaded() {
        loadedAssets++;
      updateProgress();

        if (loadedAssets >= totalAssets) {
          // Fully loaded
          setTimeout(() => {
            hideElement(loadingScreen, 500);
            showElement(languageSelectScreen, 0, "block");
          }, 800);
        }
      }

assets.addEventListener("timeout", () => {
      console.warn("⚠️ Asset loading timeout reached");
      hideElement(loadingScreen, 500);
      showElement(languageSelectScreen, 0, "block");
    });
 


function updateProgress() {
  let targetPercent = Math.floor((loadedAssets / totalAssets) * 100);

  // Animate smoothly from currentPercent to targetPercent
  let interval = setInterval(() => {
    if (currentPercent < targetPercent) {
      currentPercent++;
      progressText.textContent = `Loading... ${currentPercent}%`;
      
    } else {
      clearInterval(interval);
    }
  }, 100); // change speed (ms) for smoother/faster effect
}

// const timeDisplay = document.getElementById("timeDisplay");
// const fixedDate = new Date("19-Oct-2025 00:00:00").getTime();

// function updateTime() {
//     const now = new Date().getTime();
//     const diff = fixedDate - now;

//     if (diff <= 0) {
//         timeDisplay.innerHTML = "🎉 Time's up!";
//         return;
//     }

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//     timeDisplay.innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
// }

// // Update every second
// setInterval(updateTime, 1000);

// // Run immediately
// updateTime();

}