const newsCon = document.querySelector(".marian__news"),
  newsCards = Array.from(newsCon.querySelectorAll(".marian__card")),
  newsCardWidth = newsCards[0].getBoundingClientRect().width;

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

// Logic for the positioning
let fullWidth = window.innerWidth,
  cardWidth = newsCards[0].clientWidth,
  marginSize = (fullWidth - cardWidth) / 2;

window.oncontextmenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

newsCards.forEach((newsCard, index) => {
  newsCard.style.left = `${newsCardWidth * index + marginSize}px`;
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

function touchStart(index) {
  return function (e) {
    isDragging = true;
    currentIndex = index;
    startPos = getPositionX(e);
    animationID = requestAnimationFrame(animation);
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -80 && currentIndex < newsCards.length - 1) currentIndex += 1;
  if (movedBy > 80 && currentIndex > 0) currentIndex -= 1;

  setPosByIndex();
}

function touchMove(e) {
  if (isDragging) {
    const currentPos = getPositionX(e);
    currentTranslate = prevTranslate + currentPos - startPos;
  }
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function animation() {
  setNewsCardPos();
  if (isDragging) requestAnimationFrame(animation);
}

function setNewsCardPos() {
  return (newsCon.style.transform = `translateX(${currentTranslate}px)`);
}

function setPosByIndex() {
  currentTranslate = currentIndex * -cardWidth;
  prevTranslate = currentTranslate;
  setNewsCardPos();
}

// Thanks to Traversy Media, I have generated ideas for the
// logic he published and I had reviewed it before executing it.
