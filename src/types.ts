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

export interface Scene {
  gl: WebGL2RenderingContext;
  programInfo: ProgramInfo;
  buffers: Buffers;
  size: number;
}

export interface ViewOptions {
  rotation: number;
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
