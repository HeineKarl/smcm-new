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

const setFunction = (num) => {
  // num = 0 is mobile
  // num = 1 is tablet
  // num = 2 is desktop or else
  if (num === 0) {
    setNavigation();
    setAccordion();
  } else if (num === 1) {
    // alert("Tablet");
    setNavigation();
    setAccordion();
  } else {
    setDropdown();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const mQuery = window.matchMedia("(min-width: 0px) and (max-width: 480px)");
  const tQuery = window.matchMedia("(min-width: 481px) and (max-width: 980px)");
  const dQuery = window.matchMedia("(min-width: 910px)");

  let resizeObserver = new ResizeObserver(setResize);
  let body = document.querySelector("body");

  if (mQuery.matches) {
    body.classList.add("mobile");
  }
  if (tQuery.matches) {
    body.classList.add("tablet");
  }
  if (dQuery.matches) {
    body.classList.add("desktop");
  }

  resizeObserver.observe(body);
});

const setResize = (entries) => {
  // console.log(entries[0].contentRect.width);
  let body = entries[0].target;
  let width = entries[0].contentRect.width;
  let num = 0;
  if (width < 480) {
    if (body.classList.contains("mobile")) {
      setFunction(0);
      return;
    }
    window.location.reload();
  } else if (width > 481 && width < 980) {
    if (body.classList.contains("tablet")) {
      setFunction(1);
      return;
    }
    window.location.reload();
  } else {
    if (body.classList.contains("desktop")) {
      setFunction(2);
      return;
    }
    window.location.reload();
  }
};
