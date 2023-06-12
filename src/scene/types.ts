import { vec4 } from "gl-matrix";

export interface Scene {
  gl: WebGL2RenderingContext;
  programInfo: ProgramInfo;
  buffers: Buffers;
  size: number;
}

export interface SceneOptions {
  backgroundColor: vec4;
}

export interface ViewOptions {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
}

export interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
    vertexColor: number;
    vertexNormal: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
    normalMatrix: WebGLUniformLocation;
    uSampler: WebGLUniformLocation;
  };
}

export interface Buffers {
  position: WebGLBuffer;
  indices: WebGLBuffer;
  color: WebGLBuffer;
  normal: WebGLBuffer;
}
