"use server";

import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { UpdateUserParams } from "../../../../types";

export const updateUser = async ({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UpdateUserParams): Promise<void> => {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );
  } catch (error: any) {
    throw new Error("Failed to create/update user: ", error.message);
  }

  if (path === "/profile/edit") {
    revalidatePath(path);
  }
};
