import { Model } from "../types";
import { Buffers } from "./types";

export function initBuffers(gl: WebGLRenderingContext, model: Model) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(model.positions),
    gl.STATIC_DRAW
  );

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(model.indices),
    gl.STATIC_DRAW
  );

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(model.colors),
    gl.STATIC_DRAW
  );

  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(model.normals),
    gl.STATIC_DRAW
  );

  const buffers: Buffers = {
    position: positionBuffer,
    color: colorBuffer,
    normal: normalBuffer,
    indices: indexBuffer,
  };

  return buffers;
}
