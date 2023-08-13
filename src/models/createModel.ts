import { createSphere } from "./createSphere";
import { createBox } from "./createBox";
import { ModelParams } from "./types";
import { Model } from "../types";
import { createMesh } from "./createMesh";

export function createModel(params: ModelParams): Model {
  switch (params.type) {
    case "box":
      return createBox(params);
    case "sphere":
      return createSphere(params);
    case "mesh":
      return createMesh(params);
  }
}
