import Layout from "./layout";
import KanbanBoard from "@/components/kanban-board";

export function HomePage() {
  return (
    <>
      <Layout children={<Home />} title={"Add To Board"} />
    </>
  );
}
function Home() {
  return (
    <>
      <div className="flex ml-10 gap-4 lg:ml-28">
        <KanbanBoard />
      </div>
    </>
  );
}
