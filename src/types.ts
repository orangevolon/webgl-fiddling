export interface Model {
  positions: number[];
  indices: number[];
  colors: number[];
  normals: number[];
}

export interface ShaderSource {
  vsSource: string;
  fsSource: string;
}
