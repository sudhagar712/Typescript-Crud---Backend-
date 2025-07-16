import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  images?: string[];
  category: string;
  stock:number;
  rating:number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number },
    description: { type: String , required:[true, "Please Enter a Product Description"]},
    images: [String],
    stock:{type:Number, default:0, maxLength:20} ,
    rating:{type:Number, default:0, min:0 , max:5},
    category: {
      type: String,
      enum: ["Electronics", "Mens Clothing", "Women Clothing", "Kids Clothing",   "Books"],
      message:"Please select correct category",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
