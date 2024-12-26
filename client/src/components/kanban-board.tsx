import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

// Type definitions for tasks and board state
type TaskId = string;
type BoardId = "todo" | "ongoing" | "done" | "dropped";

interface Task {
  id: TaskId;
  content: string;
}

type BoardState = {
  [key in BoardId]: Task[];
};

const KanbanBoard: React.FC = () => {
  const [boards, setBoards] = useState<BoardState>({
    todo: [
      { id: "task1", content: "Design user interface" },
      { id: "task2", content: "Set up project repository" },
    ],
    ongoing: [{ id: "task4", content: "Finish UI" }],
    done: [{ id: "task3", content: "Create initial project structure" }],
    dropped: [{ id: "task5", content: "Finish backend" }],
  });

  const [newTaskInput, setNewTaskInput] = useState<{
    [key in BoardId]: string;
  }>({
    todo: "",
    ongoing: "",
    done: "",
    dropped: "",
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside a droppable or in the same location, do nothing
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    )
      return;

    // Ensure type safety with type assertion
    const sourceBoardId = source.droppableId as BoardId;
    const destBoardId = destination.droppableId as BoardId;

    setBoards((prevBoards) => {
      const newBoards = { ...prevBoards };

      // Remove from source list
      const [movedTask] = newBoards[sourceBoardId].splice(source.index, 1);

      // Add to destination list
      newBoards[destBoardId].splice(destination.index, 0, movedTask);

      return newBoards;
    });
  };

  const addTask = (boardId: BoardId) => {
    const taskContent = newTaskInput[boardId].trim();
    if (!taskContent) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: taskContent,
    };

    setBoards((prev) => ({
      ...prev,
      [boardId]: [...prev[boardId], newTask],
    }));

    // Reset input
    setNewTaskInput((prev) => ({
      ...prev,
      [boardId]: "",
    }));
  };

  const deleteTask = (boardId: BoardId, taskId: TaskId) => {
    setBoards((prev) => ({
      ...prev,
      [boardId]: prev[boardId].filter((task) => task.id !== taskId),
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {(Object.keys(boards) as BoardId[]).map((boardId) => (
          <Card key={boardId} className="w-1/2">
            <CardHeader>
              <CardTitle className="capitalize">{boardId} Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex mb-4">
                <Input
                  value={newTaskInput[boardId]}
                  onChange={(e) =>
                    setNewTaskInput((prev) => ({
                      ...prev,
                      [boardId]: e.target.value,
                    }))
                  }
                  placeholder={`Add a task to ${boardId}`}
                  className="mr-2"
                />
                <Button
                  onClick={() => addTask(boardId)}
                  disabled={!newTaskInput[boardId].trim()}
                >
                  <Plus className="mr-2" /> Add
                </Button>
              </div>
              <Droppable droppableId={boardId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {boards[boardId].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center bg-gray-700 p-2 rounded"
                          >
                            <span className="flex-grow">{task.content}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteTask(boardId, task.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
