import { Schema, model, Document } from "mongoose";

interface CategoryDocument extends Document {}

const CategorySchema = new Schema<CategoryDocument>({});

const CategoryModel = model<CategoryDocument>("Category", CategorySchema);

export { CategoryModel, CategoryDocument };
