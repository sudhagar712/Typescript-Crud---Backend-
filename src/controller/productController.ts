import { Request, Response } from "express";
import Product from "../models/productModel";
import { ApiFeatures } from "../utils/apiFeatures";

// GET all products
export const getAllproducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

      const resultsPerPage = 4;
      const apiFeature = new ApiFeatures(Product.find(), req.query);

      const products = await apiFeature
        .search()
        .filter()
        .paginate(resultsPerPage).query;

   
    res.status(200).json({ message: "All products fetched" ,Count: products.length , products });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



// GET product by ID
export const singleProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product fetched", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, description, category , stock, rating} = req.body;
    const images = (req.files as Express.Multer.File[]).map(
      (file) => file.filename
    );

  if (!name || !price || !description || !category) 
     {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      rating,
      images,
    });
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
   const { name, price, description, category, stock, rating } = req.body;

    const newImages = ((req.files as Express.Multer.File[]) || []).map(
      (file) => file.filename
    );

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        category,
        stock,
        rating,
        ...(newImages.length && { images: newImages }),
      },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product updated", product: updated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE product
export const delteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
