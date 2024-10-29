import pb from "@/lib/client";

const createUser = async (data: object) => {
  await pb.collection("users").create(data);
};

export default createUser;
