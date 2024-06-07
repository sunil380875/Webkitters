import { model, Model, Schema } from "mongoose";
import { QUESTION_TYPE } from "../types";

const questionSchema = new Schema<QUESTION_TYPE, Model<QUESTION_TYPE>>(
  {
    question: {
      type: String,
      required: true,
    },
    option_one: {
      type: String,
      required: true,
    },
    option_two: {
      type: String,
      required: true,
    },
    option_three: {
      type: String,
      required: true,
    },
    option_four: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
  },
  { timestamps: true }
);

const QuestionSchema = model<QUESTION_TYPE, Model<QUESTION_TYPE>>(
  "Question",
  questionSchema
);
export default QuestionSchema;
