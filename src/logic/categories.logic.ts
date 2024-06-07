import { UploadedFile } from "express-fileupload";
import { NotFound } from "http-errors";
import { Types } from "mongoose";
import { Category } from "../model";

class CategoryLogic {
  public async createCategory({ title }: { title: string }) {
    try {
      const category = await Category.create({ title });
      return category;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryLogic;
