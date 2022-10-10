"use strict";
//import data from "./astroData.json" assert { type: "json" }; Do not work in FF

fetch("./astroData.json")
  .then((res) => res.json())
  .then((data) => {
    // do stuff with the data

    data.astroObject = data.astroObject.sort((a, b) => {
      if (a.distance < b.distance) {
        return -1;
      }
    });

    const selectElementType = document.querySelector("#astro-type");
    const selectElementConst = document.querySelector("#astro-const");
    const selectElementDist = document.querySelector("#astro-dist");
    let main = null;
    let myH2 = null;
    let mySection = null;
    let selectedOption = "";

    selectElementType.addEventListener("change", (event) => {
      resetSelectElement(selectElementConst);
      resetSelectElement(selectElementDist);
      clearMainAndSelectOption();
      populateType(selectedOption);
    });

    selectElementConst.addEventListener("change", (event) => {
      resetSelectElement(selectElementType);
      resetSelectElement(selectElementDist);
      clearMainAndSelectOption();
      populateConst(selectedOption);
    });

    selectElementDist.addEventListener("change", (event) => {
      resetSelectElement(selectElementType);
      resetSelectElement(selectElementConst);
      clearMainAndSelectOption();
      populateDist(selectedOption);
      /*       console.log("asdf"); */
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

    function populateDist(astroData) {
      createH2inMainDistance(astroData);
      Object.entries(data.astroObject).forEach(([key, value]) => {
        let astroDataNumb = Number(astroData);
        /*   console.log(value.distance, astroDataNumb); */
        if (
          value.distance > Number(astroDataNumb) &&
          value.distance < Number(astroDataNumb) * 10
        ) {
          /*          console.log(value); */
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

    function createH2inMainDistance(astroData) {
      main = document.querySelector("main");
      myH2 = document.createElement("h2");
      mySection = document.createElement("section");
      myH2.textContent =
        numberWithCommas(astroData) +
        ` ly to ` +
        numberWithCommas(astroData * 10) +
        ` ly`;

      main.appendChild(myH2);
      main.appendChild(mySection);
    }

    function createAstroElement(value) {
      const myFigure = document.createElement("figure");
      const myImg = document.createElement("img");
      const myFigcaption = document.createElement("figcaption");
      const myA = document.createElement("a");

      myImg.src = `${value.url}`;
      myImg.loading = `lazy`;
      myImg.alt = `${value.id} ${value.name}`;
      myFigcaption.textContent = `. Distance ${numberWithCommas(
        value.distance
      )} ly `;

      /*      myA.title = `test`; */
      myA.href = `${value.link}`;
      myA.target = "_blank";
      const linkText = document.createTextNode(
        `${value.id} ${value.name} in ${value.constellations}`
      );
      mySection.appendChild(myFigure);
      myFigure.appendChild(myImg);
      myFigure.appendChild(myA);
      myFigure.appendChild(myFigcaption);
      myA.appendChild(linkText);
    }

    function resetSelectElement(selectElement) {
      selectElement.selectedIndex = 0; //
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  });
