import { Model } from "../types";
import { MeshModelParams } from "./types";

export function createMesh(params: MeshModelParams): Model {
  const positions: number[][] = [];
  const colors: number[][] = [];
  const normals: number[][] = [];
  const indices: number[][] = [];

  const horizontalSegmentLength = params.width / params.horizontalSegments;
  const horizontalSegmentOffset = params.width / 2;

  const verticalSegmentLength = params.height / params.verticalSegments;
  const verticalSegmentOffset = params.height / 2;

  const normal = [0, 0, 1];

  for (let horSegIdx = 0; horSegIdx < params.horizontalSegments; horSegIdx++) {
    for (let verSegIdx = 0; verSegIdx < params.verticalSegments; verSegIdx++) {
      const x = horSegIdx * horizontalSegmentLength - horizontalSegmentOffset;
      const y = verSegIdx * verticalSegmentLength - verticalSegmentOffset;
      const z = 0;

      positions.push([x, y, z]);
      colors.push(Array.from(params.color));
      normals.push(normal);

      // start from the second row and column
      if (horSegIdx > 0 && verSegIdx > 0) {
        const vertexIndex = horSegIdx * params.verticalSegments + verSegIdx;

        const vertexIndices = [
          // Upper left triangle
          vertexIndex - params.verticalSegments - 1,
          vertexIndex - params.verticalSegments,
          vertexIndex - 1,

          // Lower right triangle
          vertexIndex - params.verticalSegments,
          vertexIndex,
          vertexIndex - 1,
        ];

        indices.push(vertexIndices);
      }
    }
  }

  return {
    colors: colors.flat(),
    indices: indices.flat(),
    normals: normals.flat(),
    positions: positions.flat(),
  };
}
