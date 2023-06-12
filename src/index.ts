import { initScene } from "./scene/initScene";
import { drawScene } from "./scene/drawScene";
import { createModel } from "./models/createModel";

import vsSource from "./shaders/vertex.glsl";
import fsSource from "./shaders/fragment.glsl";

const startTime = Date.now();

function render(scene) {
  const millisFromStart = Date.now() - startTime;
  const view = { rotation: millisFromStart * 0.001 };
  drawScene(scene, view);

  requestAnimationFrame(() => render(scene));
}

(function main() {
  const canvas = document.createElement("canvas");
  const root = document.querySelector("#root");
  root.appendChild(canvas);

  const shaders = { vsSource, fsSource };
  const model = createModel({
    type: "sphere",
    radius: 1,
  });

  const scene = initScene(canvas, shaders, model);
  render(scene);
})();
