"use server";

import { connectToDB } from "@/lib/mongoose";
import { CreateEchoParams } from "../../../../types/index.d";
import Echo from "@/lib/models/echo.model";
import User from "@/lib/models/user.model";
import { revalidatePath } from "next/cache";
import Community from "@/lib/models/community.model";

export const createEcho = async ({
  text,
  author,
  communityId,
  path,
}: CreateEchoParams) => {
  try {
    connectToDB();

    const community = await Community.findOne({ id: communityId }, { _id: 1 });

    const createdEcho = await Echo.create({
      text,
      author,
      community,
    });

    await User.findByIdAndUpdate(author, {
      $push: { echoes: createdEcho._id },
    });

    if (community)
      await Community.findByIdAndUpdate(community, {
        $push: { echoes: createdEcho._id },
      });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error("Error creating echo: ", error.message);
  }
};

export const fetchEchoes = async (pageNumber = 1, pageSize = 20) => {
  connectToDB();

  const skipEchoes = (pageNumber - 1) * pageSize;
  const echoesQuery = Echo.find({ parentId: { $in: [null, undefined] } })
    .sort({
      createdAt: "desc",
    })
    .skip(skipEchoes)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "community",
      model: Community,
      select: "_id id name image",
    })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalEchoesCount = await Echo.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const echoes = await echoesQuery.exec();

  const isNext = totalEchoesCount > skipEchoes + echoes.length;

  return { echoes, isNext };
};

export const fetchEchoById = async (id: string) => {
  connectToDB();

  try {
    const echo = await Echo.findById({ _id: id })
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          { path: "author", model: User, select: "_id name parentId image" },
          {
            path: "children",
            model: Echo,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return echo;
  } catch (error: any) {
    throw new Error("Failed to find echo: ", error.message);
  }
};

export const addCommentToEcho = async ({
  echoId,
  commentText,
  userId,
  path,
}: {
  echoId: string;
  commentText: string;
  userId: string;
  path: string;
}) => {
  connectToDB();
  try {
    const originalEcho = await Echo.findById(echoId);

    if (!originalEcho) throw new Error("Echo not found");

    const commentEcho = new Echo({
      text: commentText,
      author: userId,
      parentId: echoId,
    });

    const savedCommentEcho = await commentEcho.save();

    originalEcho.children.push(savedCommentEcho._id);

    await originalEcho.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error("Failed to add comment to echo: ", error.message);
  }
};
