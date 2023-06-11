import { vec3 } from "gl-matrix";
import { rotate, translate } from "./transforms";

const VERTEX_DEFAULT_COLOR = [1.0, 1.0, 1.0, 1.0];

function createBox(width) {
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
  const colors = vertices.flatMap(() => VERTEX_DEFAULT_COLOR);

  return { positions, indices, colors };
}

function createSphere(radius) {
  const phiCount = 20;
  const thetaCount = 20;

  const vertices = [];
  const indices = [];
  const colors = [];
  const normals = [];

  for (let thetaIndex = 0; thetaIndex < thetaCount; thetaIndex++) {
    const maxThetaIndex = thetaCount - 1;
    const theta = (thetaIndex / maxThetaIndex) * Math.PI;
    const phiRadius = radius * Math.sin(theta);
    const z = radius * Math.cos(theta);

    for (let phiIndex = 0; phiIndex < phiCount; phiIndex++) {
      const maxPhiIndex = phiCount - 1;
      const phi = (phiIndex / maxPhiIndex) * Math.PI * 2;
      const x = phiRadius * Math.cos(phi);
      const y = phiRadius * Math.sin(phi);

      const vertex = [x, y, z];
      vertices.push(vertex);
      colors.push(VERTEX_DEFAULT_COLOR);

      const normal = [x, y, z];
      vec3.normalize(normal, normal);
      normals.push(normal);

      if (thetaIndex < maxThetaIndex) {
        const thetaOffset = thetaIndex * phiCount;
        const vertexIndex = thetaOffset + phiIndex;
        const rightVertexIndex = thetaOffset + ((phiIndex + 1) % phiCount);
        const bottomVertexIndex = vertexIndex + phiCount;
        const bottomRightVertexIndex = rightVertexIndex + phiCount;

        const firstTriangle = [
          vertexIndex,
          bottomVertexIndex,
          bottomRightVertexIndex,
        ];

        const secondTriangle = [
          vertexIndex,
          rightVertexIndex,
          bottomRightVertexIndex,
        ];

        indices.push(firstTriangle, secondTriangle);
      }
    }
  }

  return {
    positions: vertices.flat(),
    indices: indices.flat(),
    colors: colors.flat(),
    normals: normals.flat(),
  };
}

export function createModel(params) {
  const { type, ...modelProps } = params;

  switch (type) {
    case "box":
      return createBox(modelProps.width);
    case "sphere":
      return createSphere(modelProps.radius);
    default:
      throw new Error(`Unknown model type: ${type}`);
  }
}
