import { mapToRange } from "../utils/scalar";
import { ElementBuilder } from "./types";
import { withMouseDrag, DragEvent } from "./withMouseDrag";

export interface RotateEvent {
  rotateX: number;
  rotateY: number;
}

export interface WithDragRotateProps {
  onRotate: (dragEvent: RotateEvent, mouseEvent: MouseEvent) => void;
}

export function withDragRotate<T extends HTMLElement>(
  elementBuilder: ElementBuilder<T>,
  { onRotate }: WithDragRotateProps
) {
  let initialRotateX = 0;
  let initialRotateY = 0;
  let rotateX = 0;
  let rotateY = 0;

  const handleCanvasDrag = (event: DragEvent, mouseEvent: MouseEvent) => {
    rotateY =
      initialRotateY +
      mapToRange(event.deltaX, {
        newMax: 2 * Math.PI,
        max: window.innerWidth,
      });

    rotateX =
      initialRotateX +
      mapToRange(event.deltaY, {
        newMax: 2 * Math.PI,
        max: window.innerHeight,
      });

    onRotate({ rotateX, rotateY }, mouseEvent);
  };

  const handleCanvasDragEnd = () => {
    initialRotateX = rotateX;
    initialRotateY = rotateY;
  };

  const elementBuilderWithMouseDrag = withMouseDrag(elementBuilder, {
    onDrag: handleCanvasDrag,
    onDragEnd: handleCanvasDragEnd,
  });

  return elementBuilderWithMouseDrag;
}
