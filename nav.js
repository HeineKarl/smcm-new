const setAccordion = () => {
  // Open and Close Side Navigation
  const openBtn = document.querySelector(".hero__hamburger");
  const closeBtn = document.querySelector(".close-btn");
  const navigation = document.querySelector(".navigation");

  openBtn.addEventListener("click", () => {
    navigation.classList.add("open-nav");
  });
  closeBtn.addEventListener("click", () => {
    navigation.classList.remove("open-nav");
  });

  // Open and Close Accordion Navigation Links
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
  let maxWidthTablet = 57.75;
  const mQuery = window.matchMedia(
    `(min-width: 0em) and (max-width: ${minWidthTablet}em)`
  );
  const tQuery = window.matchMedia(
    `(min-width: ${minWidthTablet}em) and (max-width: ${maxWidthTablet}em)`
  );
  const dQuery = window.matchMedia(`(min-width: ${maxWidthTablet}em)`);

  if (mQuery.matches) {
    console.log("Mobile");
    document.body.classList.add("M");
    document.body.classList.remove("T");
    document.body.classList.remove("D");
    setAccordion();
  }
  if (tQuery.matches) {
    console.log("Tablet");
    document.body.classList.add("T");
    document.body.classList.remove("M");
    document.body.classList.remove("D");
    setAccordion();
  }
  if (dQuery.matches) {
    console.log("Desktop");
    document.body.classList.add("D");
    document.body.classList.remove("M");
    document.body.classList.remove("T");
    setDropdown();
  }

  return;
});

let rtimeNav;
let timeoutNav = false;
let deltaNav = 200;

window.addEventListener("resize", () => {
  const resizeendNav = () => {
    if (new Date() - rtimeNav < deltaNav) {
      setTimeout(resizeendNav, deltaNav);
    } else {
      timeoutNav = false;
      console.log("Done Resizing Nav");

      let minWidthTablet = 28.5;
      let maxWidthTablet = 57.75;
      const mQuery = window.matchMedia(
        `(min-width: 0em) and (max-width: ${minWidthTablet}em)`
      );
      const tQuery = window.matchMedia(
        `(min-width: ${minWidthTablet}em) and (max-width: ${maxWidthTablet}em)`
      );
      const dQuery = window.matchMedia(`(min-width: ${maxWidthTablet}em)`);
      const body = document.querySelector("body");
      let goLoad = false;
      console.log(body.scrollWidth < 1000 && body.scrollWidth > 400);
      if (body.scrollWidth < 456 && body.classList.contains("M")) {
        return;
      }
      if (
        body.scrollWidth < 924 &&
        body.scrollWidth > 456 &&
        body.classList.contains("T")
      ) {
        return;
      }
      if (
        body.scrollWidth < 1600 &&
        body.scrollWidth > 924 &&
        body.classList.contains("D")
      ) {
        return;
      }

      // if (goLoad === true) {
      // }
      window.location.reload();

      // if (mQuery.matches) {
      //   console.log("Mobile");
      //   setAccordion();
      // }
      // if (tQuery.matches) {
      //   console.log("Tablet");
      //   setAccordion();
      // }
      // if (dQuery.matches) {
      //   console.log("Desktop");
      //   setDropdown();
      // }
    }
  };

  rtimeNav = new Date();
  if (timeoutNav === false) {
    timeoutNav = true;
    setTimeout(resizeendNav, deltaNav);
  }
});
