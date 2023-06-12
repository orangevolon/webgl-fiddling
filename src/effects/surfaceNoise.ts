import { vec3 } from "gl-matrix";

export interface surfaceNoiseParams {
  amplitude: number;
  normals: number[];
}

export function surfaceNoise(vertices: number[], params: surfaceNoiseParams) {
  const newVertices = [];
  for (let i = 0; i < vertices.length; i += 3) {
    const normal = vec3.fromValues(
      params.normals[i],
      params.normals[i + 1],
      params.normals[i + 2]
    );

    const diff = vec3.create();
    const noise = params.amplitude * (Math.random() - 0.5);
    vec3.scale(diff, normal, noise);

    newVertices[i] = vertices[i] + diff[0];
    newVertices[i + 1] = vertices[i + 1] + diff[1];
    newVertices[i + 2] = vertices[i + 2] + diff[2];
  }

  return newVertices;
}
