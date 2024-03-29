import { vec3, vec4 } from "gl-matrix";
import { SphereModelParams } from "./types";
import { Model } from "../types";

const DEFAULT_VERTICAL_SEGMENTS = 20;
const DEFAULT_HORIZONTAL_SEGMENTS = 20;

export function createSphere({
  radius,
  color,
  verticalSegments = DEFAULT_VERTICAL_SEGMENTS,
  horizontalSegments = DEFAULT_HORIZONTAL_SEGMENTS,
}: SphereModelParams) {
  const phiCount = horizontalSegments;
  const thetaCount = verticalSegments;

  const positions: vec3[] = [];
  const indices: number[] = [];
  const colors: vec4[] = [];
  const normals: vec3[] = [];

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

      const vertex = vec3.fromValues(x, y, z);
      positions.push(vertex);
      colors.push(color);

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

        indices.push(...firstTriangle, ...secondTriangle);
      }
    }
  }

  const model: Model = {
    positions,
    indices,
    colors,
    normals,
  };

  return model;
}
