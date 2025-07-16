import express from "express";
import {
  createProduct,
  delteProduct,
  getAllproducts,
  singleProduct,
  updateProduct,
} from "../controller/productController";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/new", upload.array("images", 5), createProduct);
router.get("/", getAllproducts);
router.get("/:id", singleProduct);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", delteProduct);

export default router;
