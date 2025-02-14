"use server";

import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { FetchUsersParams, UpdateUserParams } from "../../../../types/index.d";
import Echo from "@/lib/models/echo.model";
import { FilterQuery } from "mongoose";
import Community from "@/lib/models/community.model";

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
    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error("Failed to fetch user: ", error.message);
  }
};

export const fetchUsers = async ({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: FetchUsersParams) => {
  try {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error("Failed to fetch users: ", error.message);
  }
};

export const fetchUserEchoes = async (userId: string) => {
  try {
    connectToDB();

    const echoes = await User.findOne({ id: userId }).populate({
      path: "echoes",
      model: Echo,
      populate: [
        { path: "community", model: Community, select: "name id image _id" },
        {
          path: "children",
          model: Echo,
          populate: {
            path: "author",
            model: User,
            select: "name image id",
          },
        },
      ],
    });

    return echoes;
  } catch (error: any) {
    throw new Error("Failed to fetch user echoes: ", error.message);
  }
};

export const getActivity = async (userId: string) => {
  try {
    connectToDB();
    const userEchoes = await Echo.find({ author: userId });

    const childEchoesIds = userEchoes.reduce((acc, userEcho) => {
      return acc.concat(userEcho.children);
    }, []);

    const replies = await Echo.find({
      _id: { $in: childEchoesIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error: any) {
    throw new Error("Failed to get activity: ", error.message);
  }
};
