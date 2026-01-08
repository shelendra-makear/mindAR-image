import { hideElement, showElement } from "./utils";
import { cardList,kelloggList } from "./script";
export default function activityscript() {
    const uiScreen = document.getElementById("ui-screen");
    const startBtn = document.getElementById("startBtn");
    const menuPage = document.querySelector(".menu-page");
    const getActiveBtn = document.getElementById("getActive");
    const comparisonPage = document.querySelector(".comparison-page");



    startBtn.addEventListener("click", () => {
        const landingPage = document.querySelector(".landing-page");
        hideElement(landingPage, 500);
        showElement(menuPage, 0, "block")
        uiScreen.style.display = "none";
    });


    getActiveBtn.addEventListener("click", () => {
         showElement(comparisonPage, 0, "block")
        const active = document.querySelector(".card.active");
        const index = active.dataset.index;
        const selected = cardList[index];

    // update top-row left side (selected item)
    const leftFood = document.querySelector(".top-row .food");
    leftFood.querySelector("img").src = selected.img;
    leftFood.querySelector("p").textContent = selected.text;

    

    // UPDATE ONLY LEFT COLUMN
    const leftCol = document.querySelectorAll(".compare-box .col:first-child p");

    const leftValues = [
        selected.Energy,
        selected.Protein,
        selected.Fat,
        selected.Carbs,
        selected.Energy,
        selected.Energy,
        selected.Protein,
        selected.Fat,
        selected.Carbs,
        selected.Energy,
    ];

    leftValues.forEach((v, i) => {
        leftCol[i].textContent = v;
    });



//     const idParam =  window.location.pathname.replace('/', '')

// if (!idParam) {
//     console.error("❌ URL missing ?id=");
//     return;
// }

// const ids = Number(idParam);
// const selectedurl = kelloggList.find(item => item.id === ids);
// console.log("Selected item from URL id:", selectedurl);
// GET SLUG FROM URL → /doet
const slug = window.location.pathname.split("/").filter(Boolean).pop();

if (!slug) {
    console.error("❌ URL slug missing");
    return;
}

// FIND ITEM BY SLUG
const selectedurl = kelloggList.find(item => item.slug === slug);

if (!selectedurl) {
    console.error("❌ No item found for slug:", slug);
    return;
}

console.log("✅ Selected item from URL:", selectedurl);

// update top-row left side
const rightFood = document.querySelector(".top-row .right-food");

if (rightFood) {
    rightFood.querySelector("img").src = selectedurl.img;
    rightFood.querySelector("p").textContent = selectedurl.text;
}

// LEFT COLUMN
const rightCol = document.querySelectorAll(".compare-box .right-col p");

if (rightCol.length === 0) {
    console.warn("⚠️ Left column elements NOT found in DOM");
    return;
}

const rightValues = [
    selectedurl.Energy,
    selectedurl.Protein,
    selectedurl.Fat,
    selectedurl.Carbs,
    selectedurl.Energy,
    selectedurl.Energy,
    selectedurl.Protein,
    selectedurl.Fat,
    selectedurl.Carbs,
    selectedurl.Energy,
];

rightValues.forEach((v, i) => {
        rightCol[i].textContent = v;
    });




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