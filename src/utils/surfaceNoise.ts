import { vec3 } from "gl-matrix";

export interface surfaceNoiseParams {
  amplitude: number;
  normals: vec3[];
}

export function surfaceNoise(vertices: vec3[], params: surfaceNoiseParams) {
  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    const normal = params.normals[i];

    const noise = params.amplitude * (Math.random() - 0.5);
    const noiseVector = vec3.create();
    vec3.scale(noiseVector, normal, noise);

    vec3.add(vertex, vertex, noiseVector);
  }
}
