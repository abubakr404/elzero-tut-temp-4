// tuti framework cerated by abubakr

// function to swipe class on click

function classShuffleTT(allElements, classToAdd, classToRemove = classToAdd) {
  allElements.forEach((element) => {
    element.addEventListener("click", (e) => {
      allElements.forEach((ele) => {
        ele.classList.remove(classToRemove);
      });
      element.classList.add(classToAdd);
    });
  });
}

function classTogglerTT(eleListener, classToToggle, eleToToggle = ele) {
  eleListener.addEventListener("click", (event) => {
    eleToToggle.classList.toggle(classToToggle);
  });
}

function classAdderTT(eleListener, classToAdd, eleToAdd = ele) {
  eleListener.addEventListener("click", (event) => {
    eleToAdd.classList.add(classToAdd);
  });
}

function classRemoverTT(eleListener, classToRemove, eleToRemove = ele) {
  eleListener.addEventListener("click", (event) => {
    eleToRemove.classList.remove(classToRemove);
  });
}

export { classShuffleTT, classTogglerTT, classAdderTT, classRemoverTT };
