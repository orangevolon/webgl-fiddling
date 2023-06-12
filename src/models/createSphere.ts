import { vec3 } from "gl-matrix";
import { SphereModelParams } from "./types";
import { Model } from "../types";

export function createSphere({ radius, color }: SphereModelParams) {
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
      colors.push(Array.from(color));

      const normal: vec3 = [x, y, z];
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

  const model: Model = {
    positions: vertices.flat(),
    indices: indices.flat(),
    colors: colors.flat(),
    normals: normals.flat(),
  };

  return model;
}
