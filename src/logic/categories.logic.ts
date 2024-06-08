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
  public async getCategories({ perPage, pageNO }: any) {
    try {
      let args: PipelineStage[] = [];
      args.push({ $sort: { createdAt: -1 } });
      const categories = await aggregationData({
        model: Category,
        per_page: perPage,
        pageNo: pageNO,
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
