import { vec4 } from "gl-matrix";

interface ModelBaseParams {
  type: string;
  color: vec4;
}

export interface SphereModelParams extends ModelBaseParams {
  type: "sphere";
  radius: number;
}

export interface CubeModelParams extends ModelBaseParams {
  type: "cube";
  width: number;
}

export type ModelParams = SphereModelParams | CubeModelParams;
