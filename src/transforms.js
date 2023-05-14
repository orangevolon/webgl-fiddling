import { vec3 } from "gl-matrix";

export function translate(vertices, { x, y, z }) {
  const transform = vec3.fromValues(x, y, z);

  for (const vertex of vertices) {
    vec3.add(vertex, vertex, transform);
  }
}

export function rotate(vertices, { rx, ry, rz, origin = [0, 0, 0] }) {
  for (const vertex of vertices) {
    vec3.rotateX(vertex, vertex, origin, rx);
    vec3.rotateY(vertex, vertex, origin, ry);
    vec3.rotateZ(vertex, vertex, origin, rz);
  }
}
