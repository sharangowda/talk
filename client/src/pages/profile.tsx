import Layout from "./layout";

export default function ProfilePage() {
  return (
    <>
      <Layout title="Profile" children={<ProfileCard />} />
    </>
  );
}

function ProfileCard() {
  return <>Profile 1</>;
}
