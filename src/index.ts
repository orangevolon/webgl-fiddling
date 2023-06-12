import { initScene } from "./scene/initScene";
import { drawScene } from "./scene/drawScene";
import { createModel } from "./models/createModel";

import vsSource from "./shaders/vertex.glsl";
import fsSource from "./shaders/fragment.glsl";
import { ShaderSource } from "./types";
import { vec4 } from "gl-matrix";
import { Scene } from "./scene/types";

const startTime = Date.now();

function render(scene: Scene) {
  const millisFromStart = Date.now() - startTime;
  const view = { rotation: millisFromStart * 0.001 };
  drawScene(scene, view);

  requestAnimationFrame(() => render(scene));
}

(function main() {
  const canvas = document.createElement("canvas");
  const root = document.querySelector("#root");
  root.appendChild(canvas);

  const shaders: ShaderSource = { vsSource, fsSource };
  const model = createModel({
    type: "sphere",
    radius: 1,
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
  });

  const scene = initScene(canvas, shaders, model);
  render(scene);
})();
