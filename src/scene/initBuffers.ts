import { Model } from "../types";
import { Buffers } from "./types";

export function initBuffers(gl: WebGLRenderingContext, model: Model) {
  // Vertices
  const positionData = new Float32Array(
    model.positions.flatMap((vertex) => [...vertex])
  );
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW);

  // Indices
  const indexData = new Uint16Array(model.indices);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW);

  // Vertex colors
  const colorData = new Float32Array(
    model.colors.flatMap((vertexColor) => [...vertexColor])
  );
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);

  // Vertex normals
  const normalData = new Float32Array(
    model.normals.flatMap((vertexNormal) => [...vertexNormal])
  );
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, normalData, gl.STATIC_DRAW);

  const buffers: Buffers = {
    position: positionBuffer,
    color: colorBuffer,
    normal: normalBuffer,
    indices: indexBuffer,
  };

  return buffers;
}
