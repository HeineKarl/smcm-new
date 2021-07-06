const tracker = document.querySelector(".slider__tracker");
const slides = Array.from(tracker.children);
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slideWidth = slides[1].getBoundingClientRect().width;
const dotTracker = document.querySelector(".slider__dots");
const dots = Array.from(dotTracker.children);

// Set the Slides in their position
const setSliderPosition = (slide, index) => {
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
const nextEvent = () => {
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
// Time 4.5s for restarting Slides
setInterval(restartSlides, 4500);

let rtime;
let timeout = false;
let delta = 200;

window.addEventListener("resize", () => {
  const firstSlide = tracker.firstElementChild;
  const currentSlide = tracker.querySelector(".current-slide");
  const firstDot = dotTracker.firstElementChild;
  const currentDot = dotTracker.querySelector(".current-dot");

  // Set its slides on the first slide
  if (!firstSlide.classList.contains("current-slide")) {
    currentSlide.classList.remove("current-slide");
    firstSlide.classList.add("current-slide");
    tracker.style.transform = `translateX(${0}px)`;
    currentDot.classList.remove("current-dot");
    firstDot.classList.add("current-dot");
    return;
  }

  const resizeend = () => {
    if (new Date() - rtime < delta) {
      // Wait for the resize to end
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      // console.log("Done Resizing Slider");

      const slides = Array.from(tracker.children);
      const slideWidth = slides[1].getBoundingClientRect().width;
      const m = matchMedia("(min-width: 0em) and (max-width: 90em)");
      // Set the slides to the start to be able to adjust
      if (m.matches) {
        const setSliderPosition = (slide, index) => {
          slide.style.left = `${(slideWidth * index) / 0.6}px`;
        };
        slides.forEach(setSliderPosition);
      }
    }
  };

  rtime = new Date();
  // Set the resize to end
  if (timeout === false) {
    timeout = true;
    setTimeout(resizeend, delta);
  }
});
