import { initScene } from "./scene/initScene";
import { drawScene } from "./scene/drawScene";
import { createModel } from "./models/createModel";

import vsSource from "./shaders/vertex.glsl";
import fsSource from "./shaders/fragment.glsl";
import { ShaderSource } from "./types";
import { vec4 } from "gl-matrix";

import "./index.css";
import { createCanvas } from "./elements/createCanvas";
import { withDragRotate } from "./elements/withDragRotate";
import { withNoise } from "./hofs/withModelNoise";

const sceneInitialOptions = {
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  zoom: 5,
  backgroundColor: vec4.fromValues(0.0, 0.0, 0.0, 0.0),
};

(function main() {
  const shaders: ShaderSource = { vsSource, fsSource };

  const createModelWithNoise = withNoise(createModel, {
    amplitude: 0.01,
  });

  const createCanvasWithDrag = withDragRotate(createCanvas, {
    onRotate: ({ rotateX, rotateY }) => {
      drawScene(scene, {
        ...sceneInitialOptions,
        rotateX,
        rotateY,
      });
    },
  });

  const model = createModelWithNoise({
    type: "mesh",
    width: 2,
    height: 2,
    color: vec4.fromValues(1.0, 1.0, 1.0, 1.0),
    horizontalSegments: 100,
    verticalSegments: 100,
  });

  const canvas = createCanvasWithDrag();

  const root = document.querySelector("#root");
  root.appendChild(canvas);

  const scene = initScene(canvas, shaders, model, {
    backgroundColor: sceneInitialOptions.backgroundColor,
  });

  drawScene(scene, sceneInitialOptions);
})();
