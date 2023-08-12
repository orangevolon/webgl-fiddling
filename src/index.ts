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
import { withMouseDrag, DragEvent } from "./elements/withMouseDrag";

(function main() {
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

  const sceneOptions = {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    zoom: 5,
  };

  const handleCanvasDrag = (event: DragEvent) => {
    sceneOptions.rotateX = (event.deltaX / window.innerWidth) * Math.PI * 2;
    sceneOptions.rotateY = -(event.deltaY / window.innerHeight) * Math.PI * 2;

    drawScene(scene, sceneOptions);
  };

  const createCanvasWithDrag = withMouseDrag(createCanvas, handleCanvasDrag);
  const canvas = createCanvasWithDrag();

  const root = document.querySelector("#root");
  root.appendChild(canvas);

  const scene = initScene(canvas, shaders, model, {
    backgroundColor: [0.0, 0.0, 0.0, 0.0],
  });

  drawScene(scene, sceneOptions);
})();
