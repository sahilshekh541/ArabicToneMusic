const horizontalContainer = document.querySelector(".musics-horizontal");

let isMousedown = false;
let startX;
let scrollLeft;

horizontalContainer.addEventListener("mousedown", (e) => {
  isMousedown = true;
  startX = e.pageX - horizontalContainer.offsetLeft;
  scrollLeft = horizontalContainer.scrollLeft;
});

horizontalContainer.addEventListener("mouseup", () => {
  isMousedown = false;
});

horizontalContainer.addEventListener("mouseleave", () => {
  isMousedown = false;
});

horizontalContainer.addEventListener("mousemove", (e) => {
  if (!isMousedown) return;
  e.preventDefault();
  const x = e.pageX - horizontalContainer.offsetLeft;
  const walk = (x - startX) * 2;
  horizontalContainer.scrollLeft = scrollLeft - walk;
});
