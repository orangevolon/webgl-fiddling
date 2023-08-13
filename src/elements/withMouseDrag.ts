import { ElementBuilder } from "./types";

export interface DragEvent {
  deltaX: number;
  deltaY: number;
}

export interface DragEvents {
  onDrag: (dragEvent: DragEvent, mouseEvent: MouseEvent) => void;
  onDragStart?: (mouseEvent: MouseEvent) => void;
  onDragEnd?: (mouseEvent: MouseEvent) => void;
}

export function withMouseDrag<T extends HTMLElement>(
  elementBuilder: ElementBuilder<T>,
  { onDrag, onDragStart, onDragEnd }: DragEvents
): ElementBuilder<T> {
  return () => {
    const element = elementBuilder();

    let isDragging = false;
    let mouseDownX: number;
    let mouseDownY: number;

    element.style.cursor = "grab";

    element.addEventListener("mousedown", (event) => {
      element.style.cursor = "grabbing";
      isDragging = true;
      mouseDownX = event.clientX;
      mouseDownY = event.clientY;

      onDragStart?.(event);
    });

    element.addEventListener("mouseup", (event) => {
      element.style.cursor = "grab";
      isDragging = false;

      onDragEnd?.(event);
    });

    element.addEventListener("mousemove", (event) => {
      if (isDragging) {
        if (!mouseDownX || !mouseDownY) {
          throw new Error("Could not capture mouse down event");
        }

        const dragEvent = {
          deltaX: event.clientX - mouseDownX,
          deltaY: event.clientY - mouseDownY,
        };

        onDrag(dragEvent, event);
      }
    });

    return element;
  };
}
