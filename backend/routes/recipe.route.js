import { Router } from "express";
import {
    getAllRecipes,
    createRecipe,
    getUserRecipes,
    deleteUserRecipes,
    updateUserRecipe,
    getRecipeById
} from "../controllers/recipe.controller.js";
const router = Router()

router.route("/").get(getAllRecipes)
router.route("/create").post(createRecipe)
router.route("/userRecipes/:userId").get(getUserRecipes)
router.route("/:id").get(getRecipeById)
router.route("/delete/:recipeId").delete(deleteUserRecipes)
router.route("/update/:recipeId").put(updateUserRecipe)

export default router