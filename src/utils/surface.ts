import { vec3 } from "gl-matrix";
import { getMean } from "./vector";

// This function has problem understanding the general direction of facets
export function getSurfaceNormals(positions: vec3[], indices: number[]) {
  const verticesNormals: vec3[][] = Array(positions.length);

  for (let triangleIdx = 0; triangleIdx < indices.length; triangleIdx += 3) {
    const triangleIndices = indices.slice(triangleIdx, triangleIdx + 3);

    const triangleVertices = triangleIndices.map(
      (vertexIndex) => positions[vertexIndex]
    );

    const [v1, v2, v3] = triangleVertices;
    const normal = vec3.create();

    const vector1 = vec3.create();
    vec3.subtract(vector1, v2, v1);

    const vector2 = vec3.create();
    vec3.subtract(vector2, v3, v1);

    vec3.cross(normal, vector2, vector1);
    vec3.normalize(normal, normal);

    const canFormASurface = vec3.length(normal) > 0;

    if (canFormASurface) {
      triangleIndices.forEach((vertexIndex) => {
        if (!verticesNormals[vertexIndex]) verticesNormals[vertexIndex] = [];

        verticesNormals[vertexIndex].push(normal);
      });
    }
  }

  const normals: vec3[] = [];

  for (let vertexIdx = 0; vertexIdx < verticesNormals.length; vertexIdx++) {
    const vertexNormals = verticesNormals[vertexIdx];
    if (vertexNormals.length > 0) {
      const meanNormal = getMean(vertexNormals);
      vec3.normalize(meanNormal, meanNormal);
      normals[vertexIdx] = meanNormal;
    } else if (vertexIdx > 0) {
      normals[vertexIdx] = normals[vertexIdx - 1];
    } else {
      normals[vertexIdx] = vec3.fromValues(0, 0, 1);
    }
  }

  return normals;
}

export interface surfaceNoiseParams {
  amplitude: number;
  normals: vec3[];
}

export function addSurfaceNoise(vertices: vec3[], params: surfaceNoiseParams) {
  for (let i = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    const normal = params.normals[i];

    const noise = gaussianRandom(0, params.amplitude);
    const noiseVector = vec3.create();
    vec3.scale(noiseVector, normal, noise);

    vec3.add(vertex, vertex, noiseVector);
  }
}

// Standard Normal variate using Box-Muller transform.
export function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}
