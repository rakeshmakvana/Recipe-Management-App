import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Recipe } from "../models/recipe.model.js";
import { User } from "../models/user.model.js";

const getAllRecipes = asyncHandler(async (_, resp) => {
    try {
        const recipe = await Recipe.find({})
        return resp.status(200).json(
            new ApiResponse(200, recipe, `All recipes fetched successfully`)
        )
    } catch (error) {
        throw new ApiError(400, `Couldn't find recipes ${error}`)
    }
})

const createRecipe = asyncHandler(async (req, resp) => {
    const recipe = new Recipe(req.body)
    try {
        const response = await recipe.save()
        return resp.status(200).json(
            new ApiResponse(200, response, `Recipe created successfully`)
        )
    } catch (error) {
        throw new ApiError(400, `Couldn't Create Recipe : ${error}`)
    }
})

const getUserRecipes = asyncHandler(async (req, resp) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        throw new ApiError(400, `User not found`)
    }

    try {
        const userRecipes = await Recipe.find({ userOwner: user._id });
        return resp.status(200).json(new ApiResponse(200, userRecipes, `recipes fetch successfully`));
    } catch (error) {
        throw new ApiError(400, `User not found : ${error}`)
    }

})

const deleteUserRecipes = asyncHandler(async (req, resp) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);

    if (!recipe) {
        throw new ApiError(400, `Recipe not found`)
    } else {
        return resp.status(200).json(new ApiResponse(202, `recipes deleted`));
    }
})

const updateUserRecipe = asyncHandler(async (req, resp) => {
    const recipe = req.params.recipeId;
    const updateFields = req.body;

    if (!recipe) {
        throw new ApiError(400, `Recipe not found`)
    }

    if (!updateFields) {
        throw new ApiError(400, `updated fields not found`)
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipe,
        updateFields, { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
        throw new ApiError(400, `Recipe not found`)
    }

    return resp.status(200)
        .json(new ApiResponse(200, updateFields, "Recipe Updated Successfully"))
})

const getRecipeById = asyncHandler(async (req, resp) => {
    const recipeId = req.params.id;

    if (!recipeId) {
        throw new ApiError(400, `Recipe not found`);
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new ApiError(400, `Recipe not found`);
    }

    resp.status(200).json(new ApiResponse(200, recipe, "Recipe Fetch Successfully"))
})

export {
    getAllRecipes,
    createRecipe,
    getUserRecipes,
    deleteUserRecipes,
    updateUserRecipe,
    getRecipeById
}