import { DndContext } from "@dnd-kit/core";
import Draggable from "./kb-components/draggable";
import Droppable from "./kb-components/droppable";

export default function KanbanBoard() {
  return (
    <>
      <DndContext>
        <Draggable />
        <Droppable />
      </DndContext>
    </>
  );
}
