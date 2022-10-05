"use strict";

import data from "./astroData.json" assert { type: "json" };
/* console.log(data.astroObject); */

const selectElementType = document.querySelector("#astro-type");
const selectElementConst = document.querySelector("#astro-const");
const selectElementNebula = document.querySelector("#astro-nebula");
let main = null;
let myH2 = null;

let selectedOption = "";

selectElementType.addEventListener("change", (event) => {
  clearMainAndSelectOption();
  populateType(selectedOption);
});

selectElementConst.addEventListener("change", (event) => {
  clearMainAndSelectOption();
  populateConst(selectedOption);
});

selectElementNebula.addEventListener("change", (event) => {
  clearMainAndSelectOption();
  populateNebula(selectedOption);
});

function populateType(astroData) {
  /*  const main = document.querySelector("main");
  const myH2 = document.createElement("h2");

  myH2.textContent = astroData;
  main.appendChild(myH2); */
  createH2inMain(astroData);

  Object.entries(data.astroObject).forEach(([key, value]) => {
    const words = value.type.split(" ");
    //console.log(words[1], astroType.toLowerCase());

    //console.log("Before: " + value.type, astroType, words[1]);
    if (words[1].toLowerCase() === astroData.toLowerCase()) {
      //console.log("After: " + value.type, astroType);
      const myImg = document.createElement("img");
      myImg.src = `${value.url}`;
      main.appendChild(myImg);
    }
  });
}

function populateConst(astroData) {
  /*   const main = document.querySelector("main");
  const myH2 = document.createElement("h2");

  myH2.textContent = astroData;
  main.appendChild(myH2); */
  createH2inMain(astroData);

  Object.entries(data.astroObject).forEach(([key, value]) => {
    if (value.constellations === astroData) {
      const myImg = document.createElement("img");
      myImg.src = `${value.url}`;
      main.appendChild(myImg);
    }
  });
}

function populateNebula(astroData) {
  /*  const main = document.querySelector("main");
  const myH2 = document.createElement("h2");

  myH2.textContent = astroData;
  main.appendChild(myH2); */
  createH2inMain(astroData);

  Object.entries(data.astroObject).forEach(([key, value]) => {
    if (value.type === astroData) {
      const myImg = document.createElement("img");
      myImg.src = `${value.url}`;
      main.appendChild(myImg);
    }
  });
}

function clearMainAndSelectOption() {
  let node = document.querySelector("main");
  node.querySelectorAll("*").forEach((n) => n.remove());
  selectedOption = event.target.value;
}

function createH2inMain(astroData) {
  main = document.querySelector("main");
  myH2 = document.createElement("h2");
  myH2.textContent = astroData;
  main.appendChild(myH2);
}
