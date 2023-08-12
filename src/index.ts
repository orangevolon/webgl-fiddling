import { initScene } from "./scene/initScene";
import { drawScene } from "./scene/drawScene";
import { createModel } from "./models/createModel";

import vsSource from "./shaders/vertex.glsl";
import fsSource from "./shaders/fragment.glsl";
import { ShaderSource } from "./types";
import { vec4 } from "gl-matrix";

import "./index.css";
import { createCanvas } from "./elements/createCanvas";
import { surfaceNoise } from "./effects/surfaceNoise";

(function main() {
  const canvas = createCanvas();

  const root = document.querySelector("#root");
  root.appendChild(canvas);

  const shaders: ShaderSource = { vsSource, fsSource };

  const model = createModel({
    type: "mesh",
    width: 1,
    height: 1,
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    horizontalSegments: 100,
    verticalSegments: 100,
  });

  model.positions = surfaceNoise(model.positions, {
    amplitude: 0.02,
    normals: model.normals,
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
        zoom: 5,
      });
    });
  });

  drawScene(scene);
})();
