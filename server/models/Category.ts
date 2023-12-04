import mongoose, { Schema } from 'mongoose'

type CategoryDocument = Document & {
  name?: string
}

const categorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Category = mongoose.model<CategoryDocument>('Category', categorySchema)

export default Category
