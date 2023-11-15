import UserModel from "@/models/UserModel";

export async function getUserID(username: string) {
  const data = await UserModel.findOne({ where: { ll_username: username } });
  return data?.ll_id;
}