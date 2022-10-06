"use strict";
//import data from "./astroData.json" assert { type: "json" }; Do not work in FF

fetch("./astroData.json")
  .then((res) => res.json())
  .then((data) => {
    // do stuff with the data

    const selectElementType = document.querySelector("#astro-type");
    const selectElementConst = document.querySelector("#astro-const");
    let main = null;
    let myH2 = null;
    let mySection = null;
    let selectedOption = "";

    selectElementType.addEventListener("change", (event) => {
      resetSelectElement(selectElementConst);
      clearMainAndSelectOption();
      populateType(selectedOption);
    });

    selectElementConst.addEventListener("change", (event) => {
      resetSelectElement(selectElementType);
      clearMainAndSelectOption();
      populateConst(selectedOption);
    });

    function populateType(astroData) {
      createH2inMain(astroData);

      Object.entries(data.astroObject).forEach(([key, value]) => {
        const words = value.type.split(" ");
        /*     console.log(value.type, astroData);
    console.log(words[1].toLowerCase(), astroData.toLowerCase());
    console.log("-------------"); */
        if (words[1].toLowerCase() === astroData.toLowerCase()) {
          createAstroElement(value);
        } else if (value.type === astroData) {
          createAstroElement(value);
        }
      });
    }

    function populateConst(astroData) {
      createH2inMain(astroData);

      Object.entries(data.astroObject).forEach(([key, value]) => {
        if (value.constellations === astroData) {
          createAstroElement(value);
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
      mySection = document.createElement("section");
      myH2.textContent = astroData;
      main.appendChild(myH2);
      main.appendChild(mySection);
    }

    function createAstroElement(value) {
      const myFigure = document.createElement("figure");
      const myImg = document.createElement("img");
      const myFigcaption = document.createElement("figcaption");

      myImg.src = `${value.url}`;
      myFigcaption.textContent = `${value.id} ${value.name} in ${value.constellations}`;
      mySection.appendChild(myFigure);
      myFigure.appendChild(myImg);
      myFigure.appendChild(myFigcaption);
    }

    function resetSelectElement(selectElement) {
      selectElement.selectedIndex = 0; //
    }
  });
