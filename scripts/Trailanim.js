//mouse trailing animation
var body = document.body;

document.addEventListener("mousemove", (e) => {
  var elem = document.createElement("div");
  elem.setAttribute("class", "trail");
  elem.setAttribute(
    "style",
    `left:${e.clientX - 10}px; top:${e.clientY - 0}px;`
  );

  elem.onanimationend = () => {
    elem.remove();
  };

  body.insertAdjacentElement("beforeend", elem);
});
