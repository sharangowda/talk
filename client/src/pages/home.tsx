import { ModeToggle } from "@/components/mode-toggle";
import Layout from "./layout";

export function HomePage() {
  return (
    <>
      <Layout children={<Home />} />
    </>
  );
}

function Home() {
  return <>Home</>;
}
