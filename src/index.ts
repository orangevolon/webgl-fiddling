import { initScene } from "./scene/initScene";
import { drawScene } from "./scene/drawScene";
import { createModel } from "./models/createModel";

import vsSource from "./shaders/vertex.glsl";
import fsSource from "./shaders/fragment.glsl";
import { ShaderSource } from "./types";
import { vec4 } from "gl-matrix";
import { Scene } from "./scene/types";

import "./index.css";
import { createCanvas } from "./elements/createCanvas";

(function main() {
  const canvas = createCanvas();

  const root = document.querySelector("#root");
  root.appendChild(canvas);

  const shaders: ShaderSource = { vsSource, fsSource };

  const model = createModel({
    type: "sphere",
    radius: 1,
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    horizontalSegments: 20,
    verticalSegments: 20,
  });

  const scene = initScene(canvas, shaders, model, {
    backgroundColor: [0.0, 0.0, 0.0, 0.0],
  });

  window.addEventListener("mousemove", (event: MouseEvent) => {
    const rotateHorizontal = (event.clientX / window.innerWidth) * Math.PI * 2;
    const rotateVertical = (event.clientY / window.innerHeight) * Math.PI * 2;

    requestAnimationFrame(() => {
      drawScene(scene, {
        rotateX: rotateVertical,
        rotateY: -rotateHorizontal,
        rotateZ: 0,
      });
    });
  });

  drawScene(scene);
})();
