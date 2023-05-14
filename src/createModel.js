import { vec3 } from "gl-matrix";
import { rotate, translate } from "./transforms";

export function createSquare(width) {
  return [
    [-width / 2, -width / 2, 0],
    [width / 2, -width / 2, 0],
    [width / 2, width / 2, 0],
    [-width / 2, width / 2, 0],
  ];
}

export function createModel() {
  const [top, left, right, bottom, front, back] = Array(6)
    .fill()
    .map(() => createSquare(1));

  // Top
  translate(top, { x: 0, y: 0, z: 1 });

  // Bottom
  translate(bottom, { x: 0, y: 0, z: -1 });

  // Left
  rotate(left, { rx: 0, ry: Math.PI / 2, rz: 0 });
  translate(left, { x: -1, y: 0, z: 0 });

  // Right
  rotate(right, { rx: 0, ry: Math.PI / 2, rz: 0 });
  translate(right, { x: 1, y: 0, z: 0 });

  // Front
  rotate(front, { rx: Math.PI / 2, ry: 0, rz: 0 });
  translate(front, { x: 0, y: 1, z: 0 });

  // Back
  rotate(back, { rx: Math.PI / 2, ry: 0, rz: 0 });
  translate(back, { x: 0, y: -1, z: 0 });

  return [top, left, right, bottom, front, back].flat(2);
}
