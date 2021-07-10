const newsCon = document.querySelector(".marian__news"),
  newsCards = Array.from(newsCon.querySelectorAll(".marian__card"));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

// Logic for the positioning
let fullWidth, cardWidth, marginSize, newsCardWidth;

window.oncontextmenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

window.addEventListener("resize", responsive);

let rtimeCard;
let timeoutCard = false;
let deltaCard = 500;

function responsive() {
  function resizeend() {
    if (new Date() - rtimeCard < deltaCard) {
      // Wait for the resize to end
      setTimeout(resizeend, deltaCard);
    } else {
      timeoutCard = false;
      console.log("set");
      // if (currentIndex !== 0) {
      //   newsCon.style.transform = `translateX(0px)`;
      // }

      newsCards.forEach((newsCard, index) => {
        newsCard.style.left = `${getCardWidth() * index + getMargin()}px`;
      });
    }
  }

  rtimeCard = new Date();
  // Set the resize to end
  if (timeoutCard === false) {
    timeoutCard = true;
    setTimeout(resizeend, deltaCard);
  }
}

newsCards.forEach((newsCard, index) => {
  // Positioning in the right place
  newsCard.style.left = `${getCardWidth() * index + getMargin()}px`;
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
  currentTranslate = currentIndex * -getCardWidth();
  prevTranslate = currentTranslate;
  setNewsCardPos();
}

// Getting the exact Width

function getCardWidth() {
  return (newsCardWidth = newsCards[0].getBoundingClientRect().width);
}

function getWidth() {
  return (fullWidth = window.innerWidth);
}

function getMargin() {
  fullWidth = window.innerWidth;
  cardWidth = newsCards[0].clientWidth;
  marginSize = (fullWidth - cardWidth) / 2;

  return marginSize;
}
