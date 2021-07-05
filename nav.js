// Open and Close Side Navigation
const setNavigation = () => {
  const openBtn = document.querySelector(".hero__hamburger");
  const closeBtn = document.querySelector(".close-btn");
  const navigation = document.querySelector(".navigation");

  openBtn.addEventListener("click", () => {
    navigation.classList.add("open-nav");
  });
  closeBtn.addEventListener("click", () => {
    navigation.classList.remove("open-nav");
  });
};

// Open and Close Accordion Navigation Links
const setAccordion = () => {
  const menu = document.querySelectorAll(".menu");
  const menuBtn = document.querySelectorAll(".menu__btn");
  const arrowBtn = document.querySelectorAll(".fa-angle-down");

  for (let i = 0; i < menu.length; i++) {
    const menuEvent = () => {
      const links = menuBtn[i].nextElementSibling;
      links.classList.toggle("collapse");
      if (links.classList.contains("collapse")) {
        links.style.maxHeight = `${links.scrollHeight + 10}px`;
        menuBtn[i].classList.add("btn-active");
        arrowBtn[i].classList.add("arrow-active");
      } else {
        links.style.maxHeight = `${0}px`;
        menuBtn[i].classList.remove("btn-active");
        arrowBtn[i].classList.remove("arrow-active");
      }
    };

    menuBtn[i].addEventListener("click", menuEvent);
  }
};

// Open and Close Navigation Desktop
const setDropdown = () => {
  const menu = document.querySelectorAll(".menu");
  const menuBtn = document.querySelectorAll(".menu__btn");
  const arrowBtn = document.querySelectorAll(".fa-angle-down");
  const menuCon = document.querySelectorAll(".menu__container");

  for (let i = 0; i < menu.length; i++) {
    const menuEvent = () => {
      menuCon[i].classList.toggle("collapse");

      if (menuCon[i].classList.contains("collapse")) {
        menuCon[i].style.maxHeight = `${menuCon[i].scrollHeight + 10}px`;
        menuBtn[i].classList.add("drop-active");
        arrowBtn[i].classList.add("arrow-active");
      } else {
        menuCon[i].style.maxHeight = `${0}px`;
        menuBtn[i].classList.remove("drop-active");
        arrowBtn[i].classList.remove("arrow-active");
      }

      const abtMenu = menuBtn[0].classList;
      const mgtMenu = menuBtn[1].classList;
      const srvMenu = menuBtn[2].classList;

      let j;

      if (abtMenu.contains("drop-active") && mgtMenu.contains("drop-active")) {
        if (i === 0) {
          j = 1;
        }
        if (i === 1) {
          j = 0;
        }
        menuCon[j].classList.remove("collapse");
        menuCon[j].style.maxHeight = `${0}px`;
        menuBtn[j].classList.remove("drop-active");
        arrowBtn[j].classList.remove("arrow-active");
      }

      if (mgtMenu.contains("drop-active") && srvMenu.contains("drop-active")) {
        if (i === 1) {
          j = 2;
        }
        if (i === 2) {
          j = 1;
        }
        menuCon[j].classList.remove("collapse");
        menuCon[j].style.maxHeight = `${0}px`;
        menuBtn[j].classList.remove("drop-active");
        arrowBtn[j].classList.remove("arrow-active");
      }

      if (abtMenu.contains("drop-active") && srvMenu.contains("drop-active")) {
        if (i === 0) {
          j = 2;
        }
        if (i === 2) {
          j = 0;
        }
        menuCon[j].classList.remove("collapse");
        menuCon[j].style.maxHeight = `${0}px`;
        menuBtn[j].classList.remove("drop-active");
        arrowBtn[j].classList.remove("arrow-active");
      }
    };

    menuBtn[i].addEventListener("click", menuEvent);
  }

  document.addEventListener("click", (e) => {
    if (
      e.target.classList[0] === "menu__btn" ||
      e.target.classList[0] === "menu__container" ||
      e.target.classList[0] === "menu__mega" ||
      e.target.classList[0] === "menu__header" ||
      e.target.classList[0] === "menu__section" ||
      e.target.tagName === "A" ||
      e.target.tagName === "H3"
    ) {
      return;
    }
    if (
      menuCon[0].classList.contains("collapse") ||
      menuCon[1].classList.contains("collapse") ||
      menuCon[2].classList.contains("collapse")
    ) {
      menuCon.forEach((el) => {
        el.classList.remove("collapse");
        el.style.maxHeight = `${0}px`;
      });

      menuBtn.forEach((el) => {
        el.classList.remove("drop-active");
      });

      arrowBtn.forEach((el) => {
        el.classList.remove("arrow-active");
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  let minWidthTablet = 28;
  let maxWidthTablet = 50;
  const mQuery = window.matchMedia(
    `(min-width: 0em) and (max-width: ${minWidthTablet}em)`
  );
  const tQuery = window.matchMedia(
    `(min-width: ${minWidthTablet}em) and (max-width: ${maxWidthTablet}em)`
  );
  const dQuery = window.matchMedia(`(min-width: ${maxWidthTablet}em)`);

  if (mQuery.matches) {
    console.log("Mobile");
    setNavigation();
    setAccordion();
  }
  if (tQuery.matches) {
    console.log("Tablet");
    setNavigation();
    setAccordion();
  }
  if (dQuery.matches) {
    console.log("Desktop");
    setDropdown();
  }
});
