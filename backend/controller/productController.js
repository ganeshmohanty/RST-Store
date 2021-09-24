import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc        fetch all the products
// @route       GET /api/products
// @access      public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc        Fetch single product
// @route       GET /api/products/:id
// @access      public

const getProductsbyId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "product not found" });
  }
});

// @desc        Delete single product
// @route       Delete /api/products/:id
// @access      private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove(res.json({ message: "Product Removed" }));
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc 		Create a prodcut
// @route		POST /api/products
// @access	private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.params._id,
    image: "/image/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReview: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
// @desc 		Update a prodcut
// @route		PUT /api/products/:id
// @access	private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    (product.name = name),
      (product.price = price),
      (product.description = description),
      (product.image = image),
      (product.brand = brand),
      (product.category = category),
      (product.countInStock = countInStock);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});
export {
  getProducts,
  getProductsbyId,
  deleteProduct,
  createProduct,
  updateProduct,
};
