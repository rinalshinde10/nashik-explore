import Category from "../models/Category.js";


// =====================================
// CREATE CATEGORY
// =====================================

export const createCategory = async (req, res) => {
    try {
        const {
            name,
            description,
            image
        } = req.body;


        // Validate name
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }


        const categoryName = name.trim();


        // Check duplicate category
        const existingCategory = await Category.findOne({
            name: {
                $regex: `^${categoryName}$`,
                $options: "i"
            }
        });


        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }


        // Create category
        const category = await Category.create({
            name: categoryName,
            description: description
                ? description.trim()
                : "",
            image: image
                ? image.trim()
                : ""
        });


        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });


    } catch (error) {

        // Duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }


        res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: error.message
        });
    }
};


// =====================================
// GET ALL CATEGORIES
// =====================================

export const getCategories = async (req, res) => {
    try {

        const categories = await Category
            .find()
            .sort({ name: 1 });


        res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message
        });
    }
};