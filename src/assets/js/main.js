const loader = document.querySelector(".loader");
const header = document.querySelector("header");
const sections = document.querySelectorAll("main > section");
const navToggler = document.querySelector("#navToggler");
const navLinks = document.querySelectorAll(".siteNav .navLink");

let lastKnownScrollPosition = 0;
let ticking = false;

import {
  classShuffleTT,
  classTogglerTT,
  classAdderTT,
  classRemoverTT,
} from "./helpers/tuti.js";

document.addEventListener("DOMContentLoaded", () => {
  filled(window.scrollY);
  loader.style = `opacity: 0; width: 0%; height: 0%; z-index: -1;`;
});

navToggler.addEventListener("click", (event) => {
  if (header.offsetTop < lastKnownScrollPosition) {
    header.classList.toggle("open");
  } else if (header.offsetTop >= lastKnownScrollPosition) {
    header.classList.toggle("open");
    header.classList.toggle("filled");
  }
});

window.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;
  sections.forEach((section) => {
    if (
      section.offsetTop <= lastKnownScrollPosition &&
      section.offsetTop + section.offsetHeight >= lastKnownScrollPosition
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (section.id === link.dataset.ref) link.classList.add("active");
      });
    }
  });
});

addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      filled(lastKnownScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
});

let filled = function (e) {
  if (header.offsetTop < e && !header.classList.contains("filled")) {
    header.classList.add("filled");
  } else if (header.offsetTop >= e && !header.classList.contains("open")) {
    header.classList.remove("filled");
  }
};

classShuffleTT(navLinks, "active");
