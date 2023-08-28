import { ModelBuilder } from "../models/types";
import { addSurfaceNoise } from "../utils/surface";
import { getSurfaceNormals } from "../utils/surface";

export interface WithNoiseParams {
  amplitude: number;
}

export function withNoise(modelBuilder: ModelBuilder, params: WithNoiseParams) {
  return (modelParams: any) => {
    const model = modelBuilder(modelParams);
    const { amplitude } = params;

    addSurfaceNoise(model.positions, {
      amplitude,
      normals: model.normals,
    });

    const normals = getSurfaceNormals(model.positions, model.indices);

    return { ...model, normals };
  };
}
