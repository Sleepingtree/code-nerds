import { ObjectId } from "mongodb";
import { db } from "~/server/db";

export interface Post {
  name: string;
  createdBy: ObjectId;
  createDate: Date;
}

export const postCollection = db.db().collection<Post>("Post");
