import pb from "@/lib/client";

const getAuth = async (
  mail: FormDataEntryValue | null,
  pass: FormDataEntryValue | null,
) => {
  const authData = await pb.collection("users").authWithPassword(mail, pass);
  return pb.authStore.isValid;
};

export default getAuth;
