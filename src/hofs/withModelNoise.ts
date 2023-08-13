import { vec3 } from "gl-matrix";
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

    // function printNormal(label: string, normal: vec3) {
    //   console.log(
    //     `${label}: (${normal[0].toFixed(2)}, ${normal[1].toFixed(
    //       2
    //     )}, ${normal[2].toFixed(2)})`
    //   );
    // }

    // for (let i = 0; i < model.normals.length; i++) {
    //   const normal = model.normals[i];
    //   const calculatedNormal = calculatedNormals[i];
    //   printNormal(`Normal ${i}`, normal);
    //   printNormal(`Calculated ${i}`, calculatedNormal);
    // }

    return { ...model, normals };
  };
}
