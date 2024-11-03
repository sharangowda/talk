import { useState } from "react";
import { Column, Tasks } from "@/types";
import ColumnContainer from "./column-component";
import { DndContext } from "@dnd-kit/core";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const columns: Column[] = [
    {
      id: "planned",
      title: "Planned",
    },
    {
      id: "in-progress",
      title: "In Progress",
    },
    {
      id: "completed",
      title: "Completed",
    },
    {
      id: "dropped",
      title: "Dropped",
    },
  ];
  return (
    <>
      <DndContext>
        {columns.map((column) => (
          <ColumnContainer key={column.id} column={column} />
        ))}
      </DndContext>
    </>
  );
}
