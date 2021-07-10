const tracker = document.querySelector(".slider__tracker");
const slides = Array.from(tracker.children);
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const dotTracker = document.querySelector(".slider__dots");
const dots = Array.from(dotTracker.children);
const stopBtn = document.querySelector(".slider__stop");

let slideWidth;

// Set the Slides in their position
const setSliderPosition = (slide, index) => {
  slideWidth = slides[1].getBoundingClientRect().width;
  slide.style.left = `${(slideWidth * index) / 0.6}px`;
};
slides.forEach(setSliderPosition);

// Moves the Slides
const moveSlide = (tracker, currentSlide, targetSlide) => {
  tracker.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

// Moves the Dot
const moveDot = (currentDot, targetDot) => {
  currentDot.classList.remove("current-dot");
  targetDot.classList.add("current-dot");
};

// Next Button
const nextEvent = (e) => {
  const currentSlide = tracker.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;

  const currentDot = dotTracker.querySelector(".current-dot");
  const nextDot = currentDot.nextElementSibling;

  if (nextSlide === null) {
    return;
  }

  moveSlide(tracker, currentSlide, nextSlide);
  moveDot(currentDot, nextDot);
};
nextBtn.addEventListener("click", nextEvent);

// Previous Button
const prevEvent = () => {
  const currentSlide = tracker.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;

  const currentDot = dotTracker.querySelector(".current-dot");
  const prevDot = currentDot.previousElementSibling;

  if (prevSlide === null) {
    return;
  }

  moveSlide(tracker, currentSlide, prevSlide);
  moveDot(currentDot, prevDot);
};
prevBtn.addEventListener("click", prevEvent);

// Dot Button
const dotsEvent = (e) => {
  const targetDot = e.target.closest("span");

  if (!targetDot) return;
  const currentDot = dotTracker.querySelector(".current-dot");
  const currentSlide = tracker.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveSlide(tracker, currentSlide, targetSlide);
  moveDot(currentDot, targetDot);
};
dotTracker.addEventListener("click", dotsEvent);

// Restart the Slides from the Start
const restartSlides = () => {
  const firstSlide = tracker.firstElementChild;
  const lastSlide = tracker.lastElementChild;
  const firstDot = dotTracker.firstElementChild;
  const lastDot = dotTracker.lastElementChild;

  if (lastSlide.classList.contains("current-slide")) {
    tracker.style.transform = `translateX(${0}px)`;
    lastSlide.classList.remove("current-slide");
    firstSlide.classList.add("current-slide");
    lastDot.classList.remove("current-dot");
    firstDot.classList.add("current-dot");
  } else {
    nextEvent();
  }
};

let restartTime = 3000;
let interval;

const autoSlider = () => {
  interval = setInterval(restartSlides, restartTime);
};
autoSlider();

const stopEvent = (e) => {
  const icon = stopBtn.querySelector("i");
  let isClicked = stopBtn.contains(e.target);

  if (isClicked && icon.classList[1] === "fa-stop") {
    clearInterval(interval);
    icon.classList.remove("fa-stop");
    icon.classList.add("fa-play");
    stopBtn.style.backgroundColor = "Green";
  } else {
    interval = setInterval(restartSlides, restartTime);
    icon.classList.remove("fa-play");
    icon.classList.add("fa-stop");
    stopBtn.style.backgroundColor = "Red";
  }
};

stopBtn.addEventListener("click", stopEvent);

let rtime;
let timeout = false;
let delta = 200;

window.addEventListener("resize", () => {
  const firstSlide = tracker.firstElementChild;
  const firstDot = dotTracker.firstElementChild;
  const currentSlide = tracker.querySelector(".current-slide");
  const currentDot = dotTracker.querySelector(".current-dot");

  // Set its slides on the first slide
  // if (!firstSlide.classList.contains("current-slide")) {
  //   currentSlide.classList.remove("current-slide");
  //   firstSlide.classList.add("current-slide");
  //   tracker.style.transform = `translateX(${0}px)`;
  //   currentDot.classList.remove("current-dot");
  //   firstDot.classList.add("current-dot");
  //   return;
  // }

  const resizeend = () => {
    if (new Date() - rtime < delta) {
      // Wait for the resize to end
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      // console.log("Done Resizing Slider");

      // Set the slides to the start to be able to adjust

      slides.forEach(
        (slide, index) =>
          (slide.style.left = `${(getSlideWidth() * index) / 0.6}px`)
      );

      console.log(getSlideWidth());
    }
  };

  rtime = new Date();
  // Set the resize to end
  if (timeout === false) {
    timeout = true;
    setTimeout(resizeend, delta);
  }
});

function getSlideWidth() {
  return (slideWidth = slides[1].getBoundingClientRect().width);
}

console.log(getSlideWidth());
