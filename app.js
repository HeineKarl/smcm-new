const setSlider = () => {
  const tracker = document.querySelector(".slider__tracker");
  const slides = Array.from(tracker.children);
  const dotTracker = document.querySelector(".slider__dots");
  const dots = Array.from(dotTracker.children);
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const slidesWidth = slides[0].getBoundingClientRect().width;
  const marginSize = 2;

  console.log(slidesWidth, "Slide 0");
  // const position = (slide, index) => {
  //   slide.style.left = `${slidesWidth * index}px `;
  //   slide.style.marginLeft = `${index * marginSize}px`;
  // };
  // slides.forEach(position);

  const moveSlide = (track, currentSlide, targetSlide, marginTracker) => {
    const sizeSlide = parseInt(targetSlide.style.left);
    console.log(currentSlide.getBoundingClientRect().width, "Slide 0");
    console.log(`${marginTracker}px`);
    console.log(`${slidesWidth * marginTracker}px`);
    track.style.transform = `translateX(-${slidesWidth * marginTracker}px)`;
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
    const marginTracker = slides.indexOf(currentSlide) + 1;

    const currentDot = dotTracker.querySelector(".current-dot");
    const nextDot = currentDot.nextElementSibling;

    if (nextSlide === null) {
      return;
    }

    moveSlide(tracker, currentSlide, nextSlide, marginTracker);
    moveDot(currentDot, nextDot);
  };
  nextBtn.addEventListener("click", nextEvent);

  prevBtn.addEventListener("click", () => {
    const currentSlide = tracker.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const marginTracker = slides.indexOf(currentSlide) - 1;

    const currentDot = dotTracker.querySelector(".current-dot");
    const prevDot = currentDot.previousElementSibling;

    if (prevSlide === null) {
      return;
    }

    moveSlide(tracker, currentSlide, prevSlide, marginTracker);
    moveDot(currentDot, prevDot);
  });

  const dotsEvent = (e) => {
    const targetDot = e.target.closest("span");

    if (!targetDot) return;
    const currentDot = dotTracker.querySelector(".current-dot");
    const currentSlide = tracker.querySelector(".current-slide");
    const targetIndex = dots.findIndex((dot) => dot === targetDot);
    const targetSlide = slides[targetIndex];
    const marginTracker = slides.indexOf(currentSlide) - 1;

    moveSlide(tracker, currentSlide, targetSlide, marginTracker);
    moveDot(currentDot, targetDot);
  };
  dotTracker.addEventListener("click", dotsEvent);

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

  // setInterval(restartSlides, 4500);
};

setSlider();

const test = () => {
  const tracker = document.querySelector(".slider__tracker");
  const slides = Array.from(tracker.children);
  const slidesWidth = Math.round(slides[1].getBoundingClientRect().width);
  let i = 0;

  const slideW = slides[0].getBoundingClientRect();
  console.log(slidesWidth, "slide 1");
  console.log(slideW, "Slide 0");
};

// setInterval(test, 1000);
test();

// const testM = () => {
//   const mql = matchMedia("(max-width: 767px)");
//   console.log(mql.matches);
//   if (!mql.matches) {
//     console.log("It does not match");
//     return;
//   }
//   console.log("I am in a mobile");
// };

// document.addEventListener("click", testM);

// Setting Functions in right window size
// const setFunction = (num) => {
//   // num = 0 is mobile
//   // num = 1 is tablet
//   // num = 2 is desktop or else
//   if (num === 0) {
//     setNavigation();
//     setAccordion();
//     setSlider();
//   } else if (num === 1) {
//     // alert("Tablet");
//     setNavigation();
//     setAccordion();
//   } else {
//     setDropdown();
//   }
// };

// document.addEventListener("DOMContentLoaded", () => {
//   const mQuery = window.matchMedia("(min-width: 0px) and (max-width: 480px)");
//   const tQuery = window.matchMedia("(min-width: 481px) and (max-width: 980px)");
//   const dQuery = window.matchMedia("(min-width: 910px)");

//   let resizeObserver = new ResizeObserver(setResize);
//   let body = document.querySelector("body");

//   if (mQuery.matches) {
//     body.classList.add("mobile");
//   }
//   if (tQuery.matches) {
//     body.classList.add("tablet");
//   }
//   if (dQuery.matches) {
//     body.classList.add("desktop");
//   }

//   resizeObserver.observe(body);
// });

// const setResize = (entries) => {
//   // console.log(entries[0].contentRect.width);
//   let body = entries[0].target;
//   let width = entries[0].contentRect.width;
//   let num = 0;
//   if (width < 480) {
//     if (body.classList.contains("mobile")) {
//       setFunction(0);
//       return;
//     }
//     window.location.reload();
//   } else if (width > 481 && width < 980) {
//     if (body.classList.contains("tablet")) {
//       setFunction(1);
//       return;
//     }
//     window.location.reload();
//   } else {
//     if (body.classList.contains("desktop")) {
//       setFunction(2);
//       return;
//     }
//     window.location.reload();
//   }
// };
