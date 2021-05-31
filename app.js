const openBtn = document.querySelector(".hero__hamburger");
const closeBtn = document.querySelector(".close-btn");
const navigation = document.querySelector(".navigation");

openBtn.addEventListener("click", () => {
  navigation.classList.add("open-nav");
});
closeBtn.addEventListener("click", () => {
  navigation.classList.remove("open-nav");
});

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

document.addEventListener("click", (e) => {
  console.log(e.target);
});
