import { Document } from "mongoose";
import { CATEGORIES_TYPE } from "./categories.types";
export default interface QUESTION_TYPE extends Document {
  question: string;
  option_one: string;
  option_two: string;
  option_three: string;
  option_four: string;
  category: CATEGORIES_TYPE;
}
