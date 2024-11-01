import Layout from "./layout";

export default function Calender() {
  return (
    <>
      <Layout children={<CalenderFunc />} />
    </>
  );
}

function CalenderFunc() {
  return <>Calender</>;
}
