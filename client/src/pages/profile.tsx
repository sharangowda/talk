import Layout from "./layout";

export default function ProfilePage() {
  return (
    <>
      <Layout children={<ProfileCard />} />
    </>
  );
}

function ProfileCard() {
  return <>Profile 1</>;
}
