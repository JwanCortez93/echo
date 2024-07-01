"use server";

import { connectToDB } from "@/lib/mongoose";
import {
  CreateCommunityParams,
  FetchCommunitiesParams,
  UpdateCommunityInfoParams,
} from "../../../../types";
import User from "@/lib/models/user.model";
import Community from "@/lib/models/community.model";
import Echo from "@/lib/models/echo.model";
import { FilterQuery } from "mongoose";

export const createCommunity = async ({
  id,
  name,
  username,
  image,
  bio,
  createdById,
}: CreateCommunityParams) => {
  console.log("TEST: ", id, name, username, bio, image, createdById);
  try {
    connectToDB();

    const user = await User.findOne({ id: createdById });

    if (!user) {
      throw new Error("User not found");
    }

    const newCommunity = new Community({
      id,
      name,
      username,
      image,
      bio,
      createdBy: user._id,
    });

    const createdCommunity = await newCommunity.save();

    user.communities.push(createdCommunity._id);
    await user.save();
    return createdCommunity;
  } catch (error: any) {
    throw new Error("Failed to create community: ", error.message);
  }
};

export const fetchCommunities = async ({
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: FetchCommunitiesParams) => {
  try {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof Community> = {};
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const communitiesQuery = Community.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)
      .populate("members");

    const totalCommunitiesCount = await Community.countDocuments(query);

    const communities = await communitiesQuery.exec();

    const isNext = totalCommunitiesCount > skipAmount + communities.length;

    return { communities, isNext };
  } catch (error: any) {
    throw new Error("Failed to fetch communities: ", error.message);
  }
};

export const fetchCommunityDetails = async (id: string) => {
  try {
    connectToDB();
    const communityDetails = await Community.findOne({ id }).populate([
      "createdBy",
      { path: "members", model: User, select: "name username image _id id" },
    ]);

    return communityDetails;
  } catch (error: any) {
    throw new Error("Failed to fetch community details: ", error.message);
  }
};

export const fetchCommunityEchoes = async (id: string) => {
  try {
    connectToDB();
    const communityEchoes = await Community.findOne({ id }).populate({
      path: "echoes",
      model: Echo,
      populate: [
        { path: "author", model: User, select: "name image id" },
        {
          path: "children",
          model: Echo,
          populate: { path: "author", model: User, select: "image _id" },
        },
      ],
    });
    return communityEchoes;
  } catch (error: any) {
    throw new Error("Failed to fetch community echoes: ", error.message);
  }
};

export const addMemberToCommunity = async ({
  communityId,
  userId,
}: {
  communityId: string;
  userId: string;
}) => {
  try {
    connectToDB();

    const community = await Community.findOne({ id: communityId });

    if (!community) throw new Error("Community not found");

    const user = await User.findOne({ id: userId });

    if (!user) throw new Error("User not found");

    if (community.members.includes(user._id))
      throw new Error("User is already a member of this community");

    community.members.push(user._id);
    user.communities.push(community._id);
    await Promise.all([community.save(), user.save()]);

    return community;
  } catch (error: any) {
    throw new Error("Failed to add member to community: ", error.message);
  }
};

export const removeUserFromCommunity = async (
  userId: string,
  communityId: string
) => {
  try {
    connectToDB();
    const user = await User.findOne({ id: userId }, { _id: 1 });
    const community = await Community.findOne({ id: communityId }, { _id: 1 });

    if (!user) throw new Error("User not found");
    if (!community) throw new Error("Community not found");

    await Promise.all([
      Community.updateOne(
        { _id: community._id },
        { $pull: { members: user._id } }
      ),
      User.updateOne(
        {
          _id: user._id,
        },
        { $pull: { communities: community._id } }
      ),
    ]);

    return { success: true };
  } catch (error: any) {
    throw new Error("Failed to remove member from community: ", error.message);
  }
};

export const updateCommunityInfo = async ({
  communityId,
  name,
  username,
  image,
}: UpdateCommunityInfoParams) => {
  try {
    connectToDB();
    const updatedCommunity = await Community.findOneAndUpdate(
      { id: communityId },
      { name, username, image }
    );
    if (!updatedCommunity) throw new Error("Community not found");
    return updatedCommunity;
  } catch (error: any) {
    throw new Error("Failed to update community: ", error.message);
  }
};

export const deleteCommunity = async (id: string) => {
  try {
    connectToDB();
    const deletedCommunity = await Community.findOneAndDelete({ id });
    if (!deletedCommunity) throw new Error("Community not found");

    await Echo.deleteMany({ communities: id });

    const communityUsers = await User.find({ communities: id });

    const updateUserPromises = communityUsers.map((user) => {
      user.communities.pull(id);
      return user.save();
    });

    await Promise.all(updateUserPromises);

    return deletedCommunity;
  } catch (error: any) {
    throw new Error("Failed to remove community: ", error.message);
  }
};
