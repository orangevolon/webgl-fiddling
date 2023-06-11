import { translate, rotate } from "../utils/transforms";

export function createBox(width, color) {
  const faces = Array(6)
    .fill()
    .map(() => [
      [-width / 2, -width / 2, 0],
      [width / 2, -width / 2, 0],
      [width / 2, width / 2, 0],
      [-width / 2, width / 2, 0],
    ]);

  const [top, left, right, bottom, front, back] = faces;

  // Top
  translate(top, { x: 0, y: 0, z: width / 2 });

  // Bottom
  translate(bottom, { x: 0, y: 0, z: -width / 2 });

  // Left
  rotate(left, { rx: 0, ry: Math.PI / 2, rz: 0 });
  translate(left, { x: -width / 2, y: 0, z: 0 });

  // Right
  rotate(right, { rx: 0, ry: Math.PI / 2, rz: 0 });
  translate(right, { x: width / 2, y: 0, z: 0 });

  // Front
  rotate(front, { rx: Math.PI / 2, ry: 0, rz: 0 });
  translate(front, { x: 0, y: width / 2, z: 0 });

  // Back
  rotate(back, { rx: Math.PI / 2, ry: 0, rz: 0 });
  translate(back, { x: 0, y: -width / 2, z: 0 });

  const indices = faces.flatMap((_, index) => {
    const base = index * 4;
    const sideIndices = [
      // first triangle
      0, 1, 2,
      // second triangle
      0, 2, 3,
    ];
    return sideIndices.map((i) => i + base);
  });

  const vertices = faces.flat();

  const positions = vertices.flat();
  const colors = vertices.flatMap(() => color);

  // TODO: temporary normal, fix this
  const normals = positions

  return { positions, indices, colors, normals };
}
