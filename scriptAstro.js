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

    const numbOfObjects = Object.keys(data.astroObject).length;
    console.log(numbOfObjects);
    const selectNumbOfObjectsElement = document.querySelector("#num-obj");
    /*     console.log(selectNumbOfObjectsElement); */
    const numP = document.createElement("p");
    numP.textContent = `Number of astronomical objects: ${numbOfObjects}`;
    selectNumbOfObjectsElement.appendChild(numP);

    /*     main = document.querySelector("main");
    myH2 = document.createElement("h2");
    mySection = document.createElement("section");
    myH2.textContent = astroData;
    main.appendChild(myH2);
    main.appendChild(mySection); */

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
      lazyLoadFunc();
    });

    selectElementConst.addEventListener("change", (event) => {
      resetSelectElement(selectElementType);
      resetSelectElement(selectElementDist);
      clearMainAndSelectOption();
      populateConst(selectedOption);
      lazyLoadFunc();
    });

    selectElementDist.addEventListener("change", (event) => {
      resetSelectElement(selectElementType);
      resetSelectElement(selectElementConst);
      clearMainAndSelectOption();
      populateDist(selectedOption);
      lazyLoadFunc();
    });

    function populateType(astroData) {
      createH2inMain(astroData);

      Object.entries(data.astroObject).forEach(([key, value]) => {
        const words = value.type.split(" ");

        if (words[1].toLowerCase() === astroData.toLowerCase()) {
          createAstroElement(value);
        } else if (value.type === astroData) {
          createAstroElement(value);
        } else if (astroData === "All objects") {
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

        if (
          value.distance >= Number(astroDataNumb) &&
          value.distance <= Number(astroDataNumb) * 10
        ) {
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

      //myImg.src = `${value.url}`;
      const imgValue = `${value.url}`;
      const attr = document.createAttribute("data-src");
      attr.value = imgValue;
      myImg.setAttributeNode(attr);
      //myImg.loading = `lazy`;
      myImg.classList.add("lazy");
      myImg.alt = `${value.id} ${value.name}`;
      myFigcaption.textContent = ` ${value.type} in ${
        value.constellations
      } at ${numberWithCommas(value.distance)} ly.`;

      /*      myA.title = `test`; */
      myA.href = `${value.link}`;
      myA.target = "_blank";
      const linkText = document.createTextNode(`${value.id} ${value.name}.`);
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

    function lazyLoadFunc() {
      //      document.addEventListener("DOMContentLoaded", function () {
      var lazyloadImages;

      if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function (
          entries,
          observer
        ) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              image.src = image.dataset.src;
              image.classList.remove("lazy");
              imageObserver.unobserve(image);
            }
          });
        });

        lazyloadImages.forEach(function (image) {
          imageObserver.observe(image);
        });
      } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
          if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
          }

          lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
              if (img.offsetTop < window.innerHeight + scrollTop) {
                img.src = img.dataset.src;
                img.classList.remove("lazy");
              }
            });
            if (lazyloadImages.length == 0) {
              document.removeEventListener("scroll", lazyload);
              window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
            }
          }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
      }
      //});
    }
  });

/* START lazy loading */
