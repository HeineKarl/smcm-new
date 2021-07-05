const tracker = document.querySelector(".slider__tracker");
const slides = Array.from(tracker.children);
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const slideWidth = slides[1].getBoundingClientRect().width;
// const currentSlide = tracker.querySelector(".current-slide");
const dotTracker = document.querySelector(".slider__dots");
const dots = Array.from(dotTracker.children);

const setSliderPosition = (slide, index) => {
  slide.style.left = `${(slideWidth * index) / 0.6}px`;
};
slides.forEach(setSliderPosition);

const moveSlide = (tracker, currentSlide, targetSlide) => {
  tracker.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const moveDot = (currentDot, targetDot) => {
  currentDot.classList.remove("current-dot");
  targetDot.classList.add("current-dot");
};

const nextEvent = () => {
  const currentSlide = tracker.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;

  const currentDot = dotTracker.querySelector(".current-dot");
  const nextDot = currentDot.nextElementSibling;

  if (nextSlide === null) {
    return;
  }
  console.log(nextSlide.style.left);

  // tracker.style.transform = `translateX(-${nextSlide.style.left})`;
  // currentSlide.classList.remove("current-slide");
  // nextSlide.classList.add("current-slide");
  moveSlide(tracker, currentSlide, nextSlide);
  moveDot(currentDot, nextDot);
};

nextBtn.addEventListener("click", nextEvent);

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

// setInterval(nextEvent, 3000);

let rtime;
let timeout = false;
let delta = 200;

window.addEventListener("resize", () => {
  // Set its slides on the first slide
  const firstSlide = tracker.firstElementChild;
  const currentSlide = tracker.querySelector(".current-slide");
  const firstDot = dotTracker.firstElementChild;
  const currentDot = dotTracker.querySelector(".current-dot");

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
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      console.log("Done resizing");

      const slides = Array.from(tracker.children);
      const slideWidth = slides[1].getBoundingClientRect().width;
      const m = matchMedia("(min-width: 0em) and (max-width: 90em)");
      if (m.matches) {
        const setSliderPosition = (slide, index) => {
          slide.style.left = `${(slideWidth * index) / 0.6}px`;
        };
        slides.forEach(setSliderPosition);
      }
    }
  };

  rtime = new Date();
  if (timeout === false) {
    timeout = true;
    setTimeout(resizeend, delta);
  }
});
