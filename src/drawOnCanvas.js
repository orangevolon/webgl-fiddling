export function drawOnCanvas(canvas) {
  const gl = canvas.getContext("webgl2");
    
  // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
}
