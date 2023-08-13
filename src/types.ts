import { vec3, vec4 } from "gl-matrix";

export interface Model {
  positions: vec3[];
  indices: number[];
  colors: vec4[];
  normals: vec3[];
}

export interface ShaderSource {
  vsSource: string;
  fsSource: string;
}
