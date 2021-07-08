const newsCon = document.querySelector(".marian__news"),
  newsCards = Array.from(newsCon.querySelectorAll(".marian__card"));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

window.oncontextmenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

const setPosByIndex = () => {
  let cardWidth = newsCards[0].clientWidth;
  let windowWidth = window.innerWidth;
  let marginWidth = (cardWidth - windowWidth) / 2;
  let half = cardWidth + marginWidth;
  console.log(windowWidth - cardWidth);
  if (currentIndex <= 1) {
    // currentTranslate = currentIndex * -half;
    currentTranslate = currentIndex * -375;
  }
  // if (currentIndex > 1) {
  // }
  if (currentIndex > 1) {
    prevTranslate = currentTranslate;
  }
  setNewsCardPos();
};

const setNewsCardPos = () =>
  (newsCon.style.transform = `translateX(${currentTranslate}px)`);

const animation = () => {
  setNewsCardPos();
  if (isDragging) requestAnimationFrame(animation);
};

const getPositionX = (e) =>
  e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;

const touchStart = (index) => {
  return (e) => {
    isDragging = true;
    currentIndex = index;
    startPos = getPositionX(e);
    animationID = requestAnimationFrame(animation);
  };
};

const touchEnd = () => {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < newsCards.length - 1) currentIndex += 1;
  if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

  setPosByIndex();
};

const touchMove = (e) => {
  if (isDragging) {
    const currentPos = getPositionX(e);
    currentTranslate = prevTranslate + currentPos - startPos;
  }
};

newsCards.forEach((newsCard, i) => {
  const newsImage = newsCard.querySelector("img");
  newsImage.addEventListener("dragstart", (e) => e.preventDefault());

  // Touch Event
  newsCard.addEventListener("touchstart", touchStart(i));
  newsCard.addEventListener("touchend", touchEnd);
  newsCard.addEventListener("touchmove", touchMove);

  // Mouse Event
  newsCard.addEventListener("mousedown", touchStart(i));
  newsCard.addEventListener("mouseup", touchEnd);
  newsCard.addEventListener("mouseleave", touchEnd);
  newsCard.addEventListener("mousemove", touchMove);
});
