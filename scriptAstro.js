"use strict";

import data from "./astroData.json" assert { type: "json" };
/* console.log(data.astroObject); */

const selectElementType = document.querySelector("#astro-type");
let astroType = "";

selectElementType.addEventListener("change", (event) => {
  let node = document.querySelector("main");
  node.querySelectorAll("*").forEach((n) => n.remove());
  astroType = event.target.value;
  populateType(astroType);
});

const selectElementConst = document.querySelector("#astro-const");
let astroConst = "";

selectElementConst.addEventListener("change", (event) => {
  let node = document.querySelector("main");
  node.querySelectorAll("*").forEach((n) => n.remove());
  astroConst = event.target.value;
  populateConst(astroConst);
});

const selectElementNebula = document.querySelector("#astro-nebula");
let astroNebula = "";

selectElementNebula.addEventListener("change", (event) => {
  let node = document.querySelector("main");
  node.querySelectorAll("*").forEach((n) => n.remove());
  astroNebula = event.target.value;
  populateNebula(astroNebula);
});

function populateType(astroType) {
  const main = document.querySelector("main");
  const myH2 = document.createElement("h2");

  myH2.textContent = astroType;
  main.appendChild(myH2);

  Object.entries(data.astroObject).forEach(([key, value]) => {
    const words = value.type.split(" ");
    //console.log(words[1], astroType.toLowerCase());

    //console.log("Before: " + value.type, astroType, words[1]);
    if (words[1].toLowerCase() === astroType.toLowerCase()) {
      //console.log("After: " + value.type, astroType);
      const myImg = document.createElement("img");
      myImg.src = `${value.url}`;
      main.appendChild(myImg);
    }
  });
}

function populateConst(astroConst) {
  const main = document.querySelector("main");
  const myH2 = document.createElement("h2");

  myH2.textContent = astroConst;
  main.appendChild(myH2);

  Object.entries(data.astroObject).forEach(([key, value]) => {
    if (value.constellations === astroConst) {
      const myImg = document.createElement("img");
      myImg.src = `${value.url}`;
      main.appendChild(myImg);
    }
  });
}

function populateNebula(astroNebula) {
  const main = document.querySelector("main");
  const myH2 = document.createElement("h2");

  myH2.textContent = astroNebula;
  main.appendChild(myH2);

  Object.entries(data.astroObject).forEach(([key, value]) => {
    if (value.type === astroNebula) {
      const myImg = document.createElement("img");
      myImg.src = `${value.url}`;
      main.appendChild(myImg);
    }
  });
}
