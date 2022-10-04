"use strict";

import data from "./astroData.json" assert { type: "json" };
/* console.log(data.astroObject); */

const selectElement = document.querySelector("#astro-type");
let astroType = "";

selectElement.addEventListener("change", (event) => {
  let node = document.querySelector("main");
  node.querySelectorAll("*").forEach((n) => n.remove());
  astroType = event.target.value;
  populateObjects(astroType);
});

/* async function populate() {
  const requestURL = "./astroData.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  const astroDataText = await response.text();
  const astroData = JSON.parse(astroDataText);

  console.log(astroData);
  return astroData;
  //populateConstellations(astroData);
  //populateObjects(astroData);
  //   populateHeroes(superHeroes);
} */

function populateObjects(astroType) {
  const main = document.querySelector("main");
  const myH1 = document.createElement("h1");

  myH1.textContent = astroType;
  main.appendChild(myH1);

  /*   const astroData = populate(); */

  /*   const printAstroData = async () => {
    const a = await astroData;
    console.log(a);
  }; */

  Object.entries(data.astroObject).forEach(([key, value]) => {
    /*   console.log(key, value);
    console.log(value.type); */
    console.log(value.type, astroType);
    if (value.type === astroType) {
      const myImg = document.createElement("img");
      myImg.src = `${value.url}`;
      main.appendChild(myImg);
    }
  });
  /*   for (let key in data.astroObject) {
    console.log();
     if (data.astroObject[i]) {
      const myImg = document.createElement("img");
      myImg.src = `${obj.astroObject[0].url}`;
    } 
  } */
}

function populateConstellations(obj) {
  const main = document.querySelector("main");
  const myH1 = document.createElement("h1");
  //console.log(obj.astroObject[0].constellations);

  myH1.textContent = obj.astroObject[0].constellations;
  main.appendChild(myH1);

  const myPara = document.createElement("p");
  myPara.textContent = `Name: ${obj.astroObject[0].name} `;
  main.appendChild(myPara);

  const myImg = document.createElement("img");
  myImg.src = `${obj.astroObject[0].url}`;

  main.appendChild(myImg);
}

function populateType(type) {}

function populateHeroes(obj) {
  const section = document.querySelector("section");
  const heroes = obj.members;

  for (const hero of heroes) {
    const myArticle = document.createElement("article");
    const myH2 = document.createElement("h2");
    const myPara1 = document.createElement("p");
    const myPara2 = document.createElement("p");
    const myPara3 = document.createElement("p");
    const myList = document.createElement("ul");

    myH2.textContent = hero.name;
    myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
    myPara2.textContent = `Age: ${hero.age}`;
    myPara3.textContent = "Superpowers:";

    const superPowers = hero.powers;
    for (const power of superPowers) {
      const listItem = document.createElement("li");
      listItem.textContent = power;
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}

/* populate(); */
