import { hideElement, showElement } from "./utils";
export default function activityscript() {
    const startBtn = document.getElementById("startBtn");
    const menuPage = document.querySelector(".menu-page");
    const getActiveBtn = document.getElementById("getActive");
    const comparisonPage = document.querySelector(".comparison-page");



    startBtn.addEventListener("click", () => {
        const landingPage = document.querySelector(".landing-page");
        hideElement(landingPage, 500);
        showElement(menuPage, 0, "block")
    });


    getActiveBtn.addEventListener("click", () => {
         showElement(comparisonPage, 0, "block")
        const active = document.querySelector(".card.active");
        const index = active.dataset.index;
        const img = active.querySelector("img").src;

        console.log(`Active Card Index: ${index}\nImage: ${img}`);
        hideElement(menuPage, 500);
       
});


 const retryBtn = document.querySelector(".retry-btn");
  const popupOverlay = document.getElementById("popupOverlay");
  const popupYes = document.getElementById("popupYes");
  const popupNo = document.getElementById("popupNo");

//   const menuPage = document.querySelector(".menu-page");
//   const comparisonPage = document.querySelector(".comparison-page");

  // SHOW POPUP WHEN RETRY CLICKED
  retryBtn.addEventListener("click", () => {
    popupOverlay.style.display = "flex";
  });

  // YES → Go back to menu page
  popupYes.addEventListener("click", () => {
    comparisonPage.style.display = "none";
    showElement(menuPage, 0, "block");
    popupOverlay.style.display = "none";
  });

  // NO → Close popup only
  popupNo.addEventListener("click", () => {
    popupOverlay.style.display = "none";
  });



}