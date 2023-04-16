export function createCanvas() {
  const canvas = document.createElement("canvas");
  const root = document.querySelector("#root");
  root.appendChild(canvas);
  return canvas
}
