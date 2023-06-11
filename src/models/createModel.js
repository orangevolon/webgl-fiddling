import { createSphere } from "./createSphere";
import { createBox } from "./createBox";

const VERTEX_DEFAULT_COLOR = [1.0, 1.0, 1.0, 1.0];

export function createModel(params) {
  const { type, ...modelProps } = params;

  switch (type) {
    case "box":
      return createBox(modelProps.width, VERTEX_DEFAULT_COLOR);
    case "sphere":
      return createSphere(modelProps.radius, VERTEX_DEFAULT_COLOR);
    default:
      throw new Error(`Unknown model type: ${type}`);
  }
}
