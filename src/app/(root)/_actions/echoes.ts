"use server";

import { connectToDB } from "@/lib/mongoose";
import { CreateEchoParams } from "../../../../types";
import Echo from "@/lib/models/echo.model";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";

export const createEcho = async ({
  text,
  author,
  communityId,
  path,
}: CreateEchoParams) => {
  try {
    connectToDB();

    const createdEcho = await Echo.create({ text, author, communityId });

    await User.findByIdAndUpdate(author, {
      $push: { echoes: createdEcho._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error("Error creating thread: ", error.message);
  }
};
