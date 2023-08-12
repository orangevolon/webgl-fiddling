import { createSphere } from "./createSphere";
import { createBox } from "./createBox";
import { ModelParams } from "./types";
import { vec3 } from "gl-matrix";
import { Model } from "../types";
import { createMesh } from "./createMesh";

const VERTEX_DEFAULT_COLOR = vec3.fromValues(1.0, 1.0, 1.0);

export function createModel(params: ModelParams): Model {
  switch (params.type) {
    case "cube":
      return createBox(params);
    case "sphere":
      return createSphere(params);
    case "mesh":
      return createMesh(params);
  }
}
