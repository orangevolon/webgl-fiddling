import { ModelBuilder } from "../models/types";
import { surfaceNoise } from "../utils/surfaceNoise";

export interface WithNoiseParams {
  amplitude: number;
}

export function withNoise(modelBuilder: ModelBuilder, params: WithNoiseParams) {
  return (modelParams: any) => {
    const model = modelBuilder(modelParams);
    const { amplitude } = params;

    surfaceNoise(model.positions, {
      amplitude,
      normals: model.normals,
    });

    return model;
  };
}
