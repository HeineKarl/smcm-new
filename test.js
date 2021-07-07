const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let rtimeTarget;
let timeoutTarget = false;
let deltaTarget = 1000;

nextBtn.addEventListener("click", () => {
  console.log("click");

  const resizeend = () => {
    if (new Date() - rtimeTarget < deltaTarget) {
      // Wait for the resize to end
      setTimeout(resizeend, deltaTarget);
    } else {
      timeoutTarget = false;
      console.log(deltaTarget);
      console.log("Done Click");
    }
  };

  rtimeTarget = new Date();
  // Set the resize to end
  if (timeoutTarget === false) {
    timeoutTarget = true;
    setTimeout(resizeend, deltaTarget);
  }
});
