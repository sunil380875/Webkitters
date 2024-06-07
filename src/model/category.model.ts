import { model, Model, Schema } from "mongoose";
import { CATEGORIES_TYPE } from "../types";

const categorySchema = new Schema<CATEGORIES_TYPE, Model<CATEGORIES_TYPE>>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const CategorySchema = model<CATEGORIES_TYPE, Model<CATEGORIES_TYPE>>(
  "Categories",
  categorySchema
);
export default CategorySchema;
