import { Input } from "@/components/ui/input";
import Layout from "./layout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SelectFunction from "@/components/custom-select-component";
import KanbanBoard from "@/components/kanban-board";

export function HomePage() {
  return (
    <>
      <Layout children={<Home />} />
    </>
  );
}

function Home() {
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
        <div className="lg:flex lg:mt-3 lg:justify-between">
          <Input
            className="mt-1 mb-3 pr-32 lg:mt-0 lg:mr-3 lg:w-96 lg:pr-40"
            placeholder="Add work"
          />
          <SelectFunction selectProps={selectProps} />
          <Button className="mt-3 w-32 lg:w-96 lg:mt-0 lg:ml-3">Add</Button>
        </div>
      </div>
      <Separator
        className="mb-4 ml-10 mx-auto lg:ml-28"
        orientation="horizontal"
      />
      <div className="flex ml-10 lg:ml-28">
        <KanbanBoard />
      </div>
    </>
  );
}
