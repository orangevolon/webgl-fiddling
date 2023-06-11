import { createModel } from "./createModel";

function initBuffers(gl, model) {
  const { positionBuffer, indexBuffer, colorBuffer, normalBuffer } =
    initVerticesBuffer(gl, model);

  return {
    position: positionBuffer,
    color: colorBuffer,
    normal: normalBuffer,
    indices: indexBuffer,
  };
}

function initVerticesBuffer(gl, model) {
  // First, create the position buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(model.positions),
    gl.STATIC_DRAW
  );

  // Now set up the indices for the vertices
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(model.indices),
    gl.STATIC_DRAW
  );

  // Now create the color buffer
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

  return {
    positionBuffer,
    indexBuffer,
    colorBuffer,
    normalBuffer,
  };
}

export { initBuffers };
