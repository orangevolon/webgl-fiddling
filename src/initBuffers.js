import { createModel } from "./createModel";

function initBuffers(gl, model) {
  const { positionBuffer, indexBuffer, colorBuffer } = initVerticesBuffer(
    gl,
    model
  );

  // TODO: integrate me into model creation
  const normalBuffer = initNormalBuffer(gl);

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

  return {
    positionBuffer,
    indexBuffer,
    colorBuffer,
  };
}

export { initBuffers };

function initNormalBuffer(gl) {
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  const vertexNormals = [
    // Front
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

    // Back
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

    // Top
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

    // Bottom
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

    // Right
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

    // Left
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
  ];

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertexNormals),
    gl.STATIC_DRAW
  );

  return normalBuffer;
}
