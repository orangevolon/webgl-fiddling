import { vec4 } from "gl-matrix";
import { Model } from "../types";

interface ModelBaseParams {
  type: string;
  color: vec4;
}

export interface SphereModelParams extends ModelBaseParams {
  type: "sphere";
  radius: number;
  verticalSegments?: number;
  horizontalSegments?: number;
}

export interface CubeModelParams extends ModelBaseParams {
  type: "box";
  width: number;
}

export interface MeshModelParams extends ModelBaseParams {
  type: "mesh";
  width: number;
  height: number;
  horizontalSegments: number;
  verticalSegments: number;
}

export type ModelParams = SphereModelParams | CubeModelParams | MeshModelParams;

export type ModelBuilder = (params: ModelParams) => Model;
