import { vec4 } from "gl-matrix";
import { Model, ShaderSource } from "../types";
import { initBuffers } from "./initBuffers";
import { initShader } from "./initShaders";
import { ProgramInfo, Scene, SceneOptions } from "./types";

const DEFAULT_OPTIONS: SceneOptions = {
  backgroundColor: [0.0, 0.0, 0.0, 1.0],
};

export function initScene(
  canvas: HTMLCanvasElement,
  shaders: ShaderSource,
  model: Model,
  options: SceneOptions = DEFAULT_OPTIONS
) {
  const gl = canvas.getContext("webgl2");

  gl.clearColor(
    options.backgroundColor[0],
    options.backgroundColor[1],
    options.backgroundColor[2],
    options.backgroundColor[3]
  );

  gl.clear(gl.COLOR_BUFFER_BIT);

  const shaderProgram = initShader(gl, shaders);

  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
      uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
    },
  };

  const buffers = initBuffers(gl, model);

  // Flip image pixels into the bottom-to-top order that WebGL expects.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  const scene: Scene = {
    gl,
    programInfo,
    buffers,
    size: model.indices.length,
  };

  return scene;
}
