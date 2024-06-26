import { UploadedFile } from "express-fileupload";
import { NotFound } from "http-errors";
import { Types } from "mongoose";
import { Category } from "../model";
import { aggregationData } from "./pagination.helper";
import { PipelineStage } from "mongoose";
class CategoryLogic {
  public async createCategory({ title }: { title: string }) {
    try {
      const category = await Category.create({ title });
      return category;
    } catch (error) {
      throw error;
    }
  }
  public async getCategories({ perPage, pageNo, question }: any) {
    try {
      let args: PipelineStage[] = [];
      args.push({ $sort: { createdAt: -1 } });
      if (question === "ok") {
        args.push({
          $lookup: {
            from: "questions",
            localField: "_id",
            foreignField: "category",
            as: "question",
          },
        });
      }
      const categories = await aggregationData({
        model: Category,
        per_page: perPage,
        pageNo: pageNo,
        args: args,
        isTotalData: true,
      });
      return categories;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryLogic;
