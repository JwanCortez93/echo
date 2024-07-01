"use server";

import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { UpdateUserParams } from "../../../../types/index.d";
import { fetchEchoes } from "@/app/(root)/_actions/echoes";
import Echo from "@/lib/models/echo.model";

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

export const fetchUser = async (userId: string) => {
  try {
    connectToDB();
    return await User.findOne({ id: userId });
    // .populate({
    //   path: "communities",
    //   model: Community,
    // });
  } catch (error: any) {
    throw new Error("Failed to fetch user: ", error.message);
  }
};

export const fetchUserEchoes = async (userId: string) => {
  try {
    connectToDB();

    const echoes = await User.findOne({ id: userId }).populate({
      path: "echoes",
      model: Echo,
      populate: {
        path: "children",
        model: Echo,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return echoes;
  } catch (error: any) {
    throw new Error("Failed to fetch user echoes: ", error.message);
  }
};
