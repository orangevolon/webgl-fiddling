export function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  document.body.appendChild(canvas);
  return canvas;
}
