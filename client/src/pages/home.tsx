import { Input } from "@/components/ui/input";
import Layout from "./layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SelectFunction from "@/components/custom-select-component";
import KanbanBoard from "@/components/kanban-board";
import React, { useState } from "react";

export function HomePage() {
  return (
    <>
      <Layout children={<Home />} />
    </>
  );
}

function Home() {
  const [title, setTitle] = useState<string>();

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(title);
  };
  interface objects {
    value: string;
    text: string;
  }
  const selectProps: Array<objects> = [
    { value: "planned", text: "Planned" },
    { value: "in-progress", text: "In Progress" },
    { value: "completed", text: "Completed" },
    { value: "dropped", text: "Dropped" },
  ];
  return (
    <>
      <div className="flex flex-col ml-10 lg:ml-28">
        <div className="text-2xl lg:text-4xl lg:font-extrabold lg:mb-2">
          Add to Board
        </div>
        <Separator className="my-2" orientation="horizontal" />
        <form>
          <div className="lg:flex lg:mt-3 lg:justify-between">
            <Input
              className="mt-1 mb-3 pr-32 lg:mt-0 lg:mr-3 lg:w-96 lg:pr-40"
              placeholder="Add work"
              id="work"
              name="work"
              onChange={onChangeHandler}
            />
            <SelectFunction selectProps={selectProps} />
            <Button
              onClick={clickHandler}
              className="mt-3 w-32 lg:w-96 lg:mt-0 lg:ml-3"
            >
              Add
            </Button>
          </div>
        </form>
        <Separator className="mt-2 mb-6" orientation="horizontal" />
      </div>
      <div className="flex ml-10 gap-4 lg:ml-28">
        <KanbanBoard />
      </div>
    </>
  );
}
