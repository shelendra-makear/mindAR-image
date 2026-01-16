import { hideElement, showElement } from "./utils";
import { cardList,kelloggList } from "./script";
export default function activityscript() {
    const uiScreen = document.getElementById("ui-screen");
    const startBtn = document.getElementById("startBtn");
    const menuPage = document.querySelector(".menu-page");
    const getActiveBtn = document.getElementById("getActive");
    const comparisonPage = document.querySelector(".comparison-page");
   const buttonsSharePage = document.querySelector(".buttons-share-page");


const scene = document.getElementById("scene");

    startBtn.addEventListener("click", () => {
        const landingPage = document.querySelector(".landing-page");
        hideElement(landingPage, 500);
        showElement(menuPage, 0, "block")
        scene.style.display = "block";
        uiScreen.style.display = "flex";

    });

getActiveBtn.addEventListener("click", () => {
  showElement(comparisonPage, 0, "block");

  const active = document.querySelector(".card.active");
  if (!active) return;

  const index = active.dataset.index;
  const selected = cardList[index];

  // LEFT NAME
  const breakfastTableName = document.getElementById("BreakfastTableName");
  if (breakfastTableName && selected?.text) breakfastTableName.textContent = selected.text;

  // LEFT COLUMN ELEMENT
  const leftCol = document.querySelector(".table-box .left-col");
  if (!leftCol) return;

  const leftValues = [
    selected.Energy,
    selected.Protein,
    selected.Carbs,
    selected.Fat,
    selected.Calcium,
    selected.Iron,
  ];

  // remove old p
  leftCol.querySelectorAll("p").forEach(p => p.remove());

  // create new p
  leftValues.forEach(val => {
    const p = document.createElement("p");
    p.textContent = val ?? "-";
    leftCol.appendChild(p);
  });

  // RIGHT SIDE
  const slug = window.location.pathname.split("/").filter(Boolean).pop();
  if (!slug) return;

  const selectedurl = kelloggList.find(item => item.slug === slug);
  if (!selectedurl) return;

  const kelloggsTableName = document.getElementById("kelloggsTableName");
  if (kelloggsTableName) kelloggsTableName.textContent = selectedurl.name;

  const rightCol = document.querySelector(".table-box .right-col");
  if (!rightCol) return;

  const rightValues = [
    selectedurl.Energy,
    selectedurl.Protein,
    selectedurl.Carbs,
    selectedurl.Fat,
    selectedurl.Calcium,
    selectedurl.Iron,
  ];

  // remove old p
  rightCol.querySelectorAll("p").forEach(p => p.remove());

  // create new p
  rightValues.forEach(val => {
    const p = document.createElement("p");
    p.textContent = val ?? "-";
    rightCol.appendChild(p);
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
    // popupOverlay.style.display = "none";
    showElement(buttonsSharePage, 0, "flex");
    hideElement(comparisonPage, 500);
    hideElement(popupOverlay, 300);
  });



}