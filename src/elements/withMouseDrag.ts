import { ElementBuilder } from "./types";

export interface DragEvent {
  deltaX: number;
  deltaY: number;
}

export function withMouseDrag<T extends HTMLElement>(
  elementBuilder: ElementBuilder<T>,
  onDrag: (dragEvent: DragEvent, mouseEvent: MouseEvent) => void
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
    });

    element.addEventListener("mouseup", () => {
      element.style.cursor = "grab";
      isDragging = false;
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
