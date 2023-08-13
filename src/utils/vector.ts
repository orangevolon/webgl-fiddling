import { vec3 } from "gl-matrix";

type TranslateParams = {
  x: number;
  y: number;
  z: number;
};

export function translate(vertices: vec3[], params: TranslateParams) {
  const transform = vec3.fromValues(params.x, params.y, params.z);

  for (const vertex of vertices) {
    vec3.add(vertex, vertex, transform);
  }
}

type RotateParams = {
  rx: number;
  ry: number;
  rz: number;
  origin?: vec3;
};

export function rotate(vertices: vec3[], params: RotateParams) {
  const { rx, ry, rz, origin = [0, 0, 0] } = params;

  for (const vertex of vertices) {
    vec3.rotateX(vertex, vertex, origin, rx);
    vec3.rotateY(vertex, vertex, origin, ry);
    vec3.rotateZ(vertex, vertex, origin, rz);
  }
}

export function getMean(vectors: vec3[]) {
  const mean = vec3.create();

  vectors.forEach((vector) => {
    vec3.add(mean, mean, vector);
  });

  vec3.scale(mean, mean, 1 / vectors.length);

  return mean;
}
