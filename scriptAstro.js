"use strict";
fetch("./astroData.json")
  .then((e) => e.json())
  .then((e) => {
    e.astroObject = e.astroObject.sort((e, t) => {
      if (e.distance < t.distance) return -1;
    });
    let t = Object.keys(e.astroObject).length,
      n = document.querySelector("#num-obj"),
      r = document.createElement("p");
    (r.textContent = `Number of astronomical objects: ${t}`), n.appendChild(r);
    let a = document.querySelector("#astro-type"),
      o = document.querySelector("#astro-const"),
      i = document.querySelector("#astro-dist"),
      c = null,
      l = null,
      s = null,
      d = "";
    function u(t) {
      E(t),
        Object.entries(e.astroObject).forEach(([e, n]) => {
          let r = n.type.split(" ");
          r[1].toLowerCase() === t.toLowerCase()
            ? v(n)
            : n.type === t
            ? v(n)
            : "All objects" === t && v(n);
        });
    }
    function f(t) {
      E(t),
        Object.entries(e.astroObject).forEach(([e, n]) => {
          n.constellations === t && v(n);
        });
    }
    function h(t) {
      m(t),
        Object.entries(e.astroObject).forEach(([e, n]) => {
          let r = Number(t);
          n.distance >= Number(r) && n.distance <= 10 * Number(r) && v(n);
        });
    }
    function p() {
      document
        .querySelector("main")
        .querySelectorAll("*")
        .forEach((e) => e.remove()),
        (d = event.target.value);
    }
    function E(e) {
      (c = document.querySelector("main")),
        (l = document.createElement("h2")),
        (s = document.createElement("section")),
        (l.textContent = e),
        c.appendChild(l),
        c.appendChild(s);
    }
    function m(e) {
      (c = document.querySelector("main")),
        (l = document.createElement("h2")),
        (s = document.createElement("section")),
        (l.textContent = g(e) + " ly to " + g(10 * e) + " ly"),
        c.appendChild(l),
        c.appendChild(s);
    }
    function v(e) {
      let t = document.createElement("figure"),
        n = document.createElement("img"),
        r = document.createElement("figcaption"),
        a = document.createElement("a"),
        o = `${e.url}`,
        i = document.createAttribute("data-src");
      (i.value = o),
        n.setAttributeNode(i),
        n.classList.add("lazy"),
        (n.alt = `${e.id} ${e.name}`),
        (r.textContent = ` ${e.type} in ${e.constellations} at ${g(
          e.distance
        )} ly.`),
        (a.href = `${e.link}`),
        (a.target = "_blank");
      let c = document.createTextNode(`${e.id} ${e.name}.`);
      s.appendChild(t),
        t.appendChild(n),
        t.appendChild(a),
        t.appendChild(r),
        a.appendChild(c);
    }
    function y(e) {
      e.selectedIndex = 0;
    }
    function g(e) {
      return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function C() {
      if ("IntersectionObserver" in window) {
        e = document.querySelectorAll(".lazy");
        var e,
          t,
          n = new IntersectionObserver(function (e, t) {
            e.forEach(function (e) {
              if (e.isIntersecting) {
                var t = e.target;
                (t.src = t.dataset.src),
                  t.classList.remove("lazy"),
                  n.unobserve(t);
              }
            });
          });
        e.forEach(function (e) {
          n.observe(e);
        });
      } else {
        function r() {
          t && clearTimeout(t),
            (t = setTimeout(function () {
              var t = window.pageYOffset;
              e.forEach(function (e) {
                e.offsetTop < window.innerHeight + t &&
                  ((e.src = e.dataset.src), e.classList.remove("lazy"));
              }),
                0 == e.length &&
                  (document.removeEventListener("scroll", r),
                  window.removeEventListener("resize", r),
                  window.removeEventListener("orientationChange", r));
            }, 20));
        }
        (e = document.querySelectorAll(".lazy")),
          document.addEventListener("scroll", r),
          window.addEventListener("resize", r),
          window.addEventListener("orientationChange", r);
      }
    }
    a.addEventListener("change", (e) => {
      y(o), y(i), p(), u(d), C();
    }),
      o.addEventListener("change", (e) => {
        y(a), y(i), p(), f(d), C();
      }),
      i.addEventListener("change", (e) => {
        y(a), y(o), p(), h(d), C();
      });
  });
