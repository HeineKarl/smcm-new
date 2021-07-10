//////////////////// Start of Top Scroll Event ////////////////////

// Variables for the Button
const topBtn = document.querySelector(".bring-top");

// Top Button Event
topBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// Window Scroll Event
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 400) {
    topBtn.classList.add("bring-show");
  } else {
    topBtn.classList.remove("bring-show");
  }
});

//////////////////// End of Top Scroll Event ////////////////////

//////////////////// Start of Navigation Event ////////////////////

// Variables for Navigation in Mobile and Tablet
const navigation = document.querySelector(".navigation"),
  openBtn = document.querySelector(".hero__hamburger"),
  closeBtn = document.querySelector(".close-btn");

// Open and Close Event
openBtn.addEventListener("click", openSideNav);
closeBtn.addEventListener("click", closeSideNav);

// Opens the right side of the Navigation
function openSideNav() {
  navigation.classList.add("open-nav");
}

// Closes the right side of the Navigation
function closeSideNav() {
  navigation.classList.remove("open-nav");
}

// Variables for the Menu
const menu = document.querySelectorAll(".menu"),
  menuBtn = document.querySelectorAll(".menu__btn"),
  menuCon = document.querySelectorAll(".menu__container"),
  arrowBtn = document.querySelectorAll(".fa-angle-down");

// For Loop for the  Menu Button Event
for (let i = 0; i < menu.length; i++) {
  // Menu Buttons Event
  menuBtn[i].addEventListener("click", menuEvent);

  // Function from Menu Buttons Event
  function menuEvent(e) {
    // Toggles the class Collapse
    menuCon[i].classList.toggle("collapse");

    // Container Collapsing Down
    if (menuCon[i].classList.contains("collapse")) {
      menuCon[i].style.maxHeight = `${menuCon[i].scrollHeight + 10}px`;
      menuBtn[i].classList.add("drop-active");
      arrowBtn[i].classList.add("arrow-active");
    } else {
      menuCon[i].style.maxHeight = `${0}px`;
      menuBtn[i].classList.remove("drop-active");
      arrowBtn[i].classList.remove("arrow-active");
    }

    // Variables for Logic
    const abtMenu = menuBtn[0].classList,
      mgtMenu = menuBtn[1].classList,
      srvMenu = menuBtn[2].classList;

    let j,
      aboutIndex = 0,
      managementIndex = 1,
      servicesIndex = 2;
    // Values for let j
    // 1 = about menu  2 = school management menu   3 = services menu

    // These 3 ifs will alternate the collapsing
    if (abtMenu.contains("drop-active") && mgtMenu.contains("drop-active")) {
      if (i === aboutIndex) {
        j = managementIndex;
      }
      if (i === managementIndex) {
        j = aboutIndex;
      }
      alternateCollapse(j);
    }

    if (mgtMenu.contains("drop-active") && srvMenu.contains("drop-active")) {
      if (i === managementIndex) {
        j = servicesIndex;
      }
      if (i === servicesIndex) {
        j = managementIndex;
      }
      alternateCollapse(j);
    }

    if (abtMenu.contains("drop-active") && srvMenu.contains("drop-active")) {
      if (i === aboutIndex) {
        j = servicesIndex;
      }
      if (i === servicesIndex) {
        j = aboutIndex;
      }
      alternateCollapse(j);
    }
  }
}

// It alternates Collapsing Menus and Closes
function alternateCollapse(index) {
  menuCon[index].classList.remove("collapse");
  menuCon[index].style.maxHeight = `${0}px`;
  menuBtn[index].classList.remove("drop-active");
  arrowBtn[index].classList.remove("arrow-active");
}

// Document Event
document.addEventListener("click", closeConNav);

// If clicked in the Document except Menu
function closeConNav(e) {
  if (!e.target.closest(".menu")) {
    for (let i = 0; i < menu.length; i++) {
      alternateCollapse(i);
    }
  }
}

//////////////////// End of Navigation Event ////////////////////

//////////////////// Start of Slider Event ////////////////////

// Slides Variables
const tracker = document.querySelector(".slider__tracker"),
  firstSlide = tracker.firstElementChild,
  lastSlide = tracker.lastElementChild,
  slides = Array.from(tracker.children);

// Buttons Variables
const nextBtn = document.querySelector(".next-btn"),
  prevBtn = document.querySelector(".prev-btn"),
  stopBtn = document.querySelector(".slider__stop");

// Dot Variables
const dotTracker = document.querySelector(".slider__dots"),
  dots = Array.from(dotTracker.children),
  firstDot = dotTracker.firstElementChild,
  lastDot = dotTracker.lastElementChild;

let currentSlide,
  currentDot,
  slideWidth,
  interval,
  restartTime = 3000;

// Set the Slides in their position

function setSlidePos() {
  slides.forEach((slide, index) => {
    slide.style.left = `${(getSlideWidth() * index) / 0.6}px`;
  });
}
setSlidePos();

// Gets Slide Width
function getSlideWidth() {
  return (slideWidth = slides[1].getBoundingClientRect().width);
}

// Slide Events
prevBtn.addEventListener("click", prevEvent);
nextBtn.addEventListener("click", nextEvent);
dotTracker.addEventListener("click", dotsEvent);
stopBtn.addEventListener("click", pauseSlider);

// Next Button
function nextEvent() {
  currentSlide = tracker.querySelector(".current-slide");
  currentDot = dotTracker.querySelector(".current-dot");

  const nextSlide = currentSlide.nextElementSibling,
    nextDot = currentDot.nextElementSibling;

  if (nextSlide === null) {
    return;
  }

  moveSlide(tracker, currentSlide, nextSlide);
  moveDot(currentDot, nextDot);
}

// Previous Button
function prevEvent() {
  currentSlide = tracker.querySelector(".current-slide");
  currentDot = dotTracker.querySelector(".current-dot");

  const prevSlide = currentSlide.previousElementSibling,
    prevDot = currentDot.previousElementSibling;

  if (prevSlide === null) {
    return;
  }

  moveSlide(tracker, currentSlide, prevSlide);
  moveDot(currentDot, prevDot);
}

// Dot Button
function dotsEvent(e) {
  const targetDot = e.target.closest("span");

  if (!targetDot) return;

  currentDot = dotTracker.querySelector(".current-dot");
  currentSlide = tracker.querySelector(".current-slide");

  const targetIndex = dots.findIndex((dot) => dot === targetDot),
    targetSlide = slides[targetIndex];

  moveSlide(tracker, currentSlide, targetSlide);
  moveDot(currentDot, targetDot);
}

// Moves the Slides
function moveSlide(tracker, currentSlide, targetSlide) {
  tracker.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

// Moves the Dot
function moveDot(currentDot, targetDot) {
  currentDot.classList.remove("current-dot");
  targetDot.classList.add("current-dot");
}

// Automation Slide Event
function autoSlider() {
  interval = setInterval(restartSlides, restartTime);
}
autoSlider();

// Pause Automation Slide Event
function pauseSlider(e) {
  const icon = stopBtn.querySelector("i");
  let isClicked = stopBtn.contains(e.target);
  let classPause = "fa-pause",
    classPlay = "fa-play";

  if (isClicked && icon.classList[1] === classPause) {
    clearInterval(interval);
    icon.classList.remove(classPause);
    icon.classList.add(classPlay);
    stopBtn.style.backgroundColor = "Green";
  } else {
    interval = setInterval(restartSlides, restartTime);
    icon.classList.remove(classPlay);
    icon.classList.add(classPause);
    stopBtn.style.backgroundColor = "Red";
  }
}

// Restart the Slides from the Start
function restartSlides() {
  if (lastSlide.classList.contains("current-slide")) {
    tracker.style.transform = `translateX(${0}px)`;
    lastSlide.classList.remove("current-slide");
    firstSlide.classList.add("current-slide");
    lastDot.classList.remove("current-dot");
    firstDot.classList.add("current-dot");
  } else {
    nextEvent();
  }
}

//////////////////// End of Slider Event ////////////////////

//////////////////// Start of Card Event ////////////////////

// Variables for the Touch and Mouse Events
const newsCon = document.querySelector(".marian__news"),
  newsCards = Array.from(newsCon.querySelectorAll(".marian__card"));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

// Variables for the positioning
let fullWidth, cardWidth, marginSize, newsCardWidth;

// Preventing while holding touch propagation
window.oncontextmenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

// Selecting each Cards
newsCards.forEach((newsCard, index) => {
  // Positioning in the right place
  newsCard.style.left = `${getCardWidth() * index + getCardMargin()}px`;

  // Preventing image to drag
  const newsImage = newsCard.querySelector("img");
  newsImage.addEventListener("dragstart", (e) => e.preventDefault());

  // Touch Event
  newsCard.addEventListener("touchstart", touchStart(index));
  newsCard.addEventListener("touchend", touchEnd);
  newsCard.addEventListener("touchmove", touchMove);

  // Mouse Event
  newsCard.addEventListener("mousedown", touchStart(index));
  newsCard.addEventListener("mouseup", touchEnd);
  newsCard.addEventListener("mouseleave", touchEnd);
  newsCard.addEventListener("mousemove", touchMove);
});

// If touch or mouse starts, execute the function
function touchStart(index) {
  return function (e) {
    isDragging = true;
    currentIndex = index;
    startPos = getPositionX(e);
    animationID = requestAnimationFrame(animation);
  };
}

// If touch or mouse ends, move in their current position
function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -80 && currentIndex < newsCards.length - 1) currentIndex += 1;
  if (movedBy > 80 && currentIndex > 0) currentIndex -= 1;

  setPosByIndex();
}

// Moving the Card
function touchMove(e) {
  if (isDragging) {
    const currentPos = getPositionX(e);
    currentTranslate = prevTranslate + currentPos - startPos;
  }
}

// Figuring if it is Mouse or Touch
function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

// Animating the Card by sliding
function animation() {
  setNewsCardPos();
  if (isDragging) requestAnimationFrame(animation);
}

// Transforming the Container of the Card
function setNewsCardPos() {
  return (newsCon.style.transform = `translateX(${currentTranslate}px)`);
}

// Setting the position of the Card by sliding
function setPosByIndex() {
  currentTranslate = currentIndex * -getCardWidth();
  prevTranslate = currentTranslate;
  setNewsCardPos();
}

// Getting the exact Card width
function getCardWidth() {
  return (newsCardWidth = newsCards[0].getBoundingClientRect().width);
}

// Getting the Screen width
function getScreenWidth() {
  return (fullWidth = window.innerWidth);
}

// Getting the left and right Margin
function getCardMargin() {
  return (marginSize = (getScreenWidth() - getCardWidth()) / 2);
}

// E-News Card Event

//////////////////// End of Card Event ////////////////////

//////////////////// Start of Resize Event ////////////////////

// Resize Event
window.addEventListener("resize", setWait);

// Wait for the resize to end, then executes
function setWait() {
  let rtime;
  let timeout = false;
  let delta = 1000;
  const currentSlide = tracker.querySelector(".current-slide");
  const currentDot = dotTracker.querySelector(".current-dot");

  if (!firstSlide.classList.contains("current-slide")) {
    tracker.style.transform = `translateX(${0}px)`;
    currentSlide.classList.remove("current-slide");
    currentDot.classList.remove("current-dot");
    firstSlide.classList.add("current-slide");
    firstDot.classList.add("current-dot");
  }

  // Set the resize to start
  rtime = new Date();
  if (timeout === false) {
    timeout = true;
    setTimeout(resizeend, delta);
  }

  function resizeend() {
    if (new Date() - rtime < delta) {
      // Wait for the resize to end
      setTimeout(resizeend, delta);
    } else {
      timeout = false;

      // Slides
      setSlidePos();

      // Cards
      newsCards.forEach((newsCard, index) => {
        newsCard.style.left = `${getCardWidth() * index + getCardMargin()}px`;
      });
    }
  }
}

//////////////////// End of Resize Event ////////////////////
