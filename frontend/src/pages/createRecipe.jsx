import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Input, Form, Button, Tag, message } from "antd";
import UploadWidget from "../components/UploadWidget.jsx";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx";
import API_BASE_URL from "../api.js";
import "../styles/createRecipe.css";

const CreateRecipe = () => {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.data.data.user._id;
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    recipeImg: "",
    cookingTime: 0,
    userOwner: userId,
  });

  const handleChange = (field, value) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const handleIngredientChange = (value, index) => {
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    handleChange("ingredients", ingredients);
  };

  const handleAddIngredient = () => {
    handleChange("ingredients", [...recipe.ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const ingredients = [...recipe.ingredients];
    ingredients.splice(index, 1);
    handleChange("ingredients", ingredients);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const requiredFields = ["name", "instructions", "recipeImg"];
      if (requiredFields.some((field) => !recipe[field])) {
        console.error("Required fields are missing");
        return;
      }
      await axios.post(`${API_BASE_URL}/api/v1/recipe/create`, { ...recipe }, {
        headers: { authorization: cookies.access_token },
      });
      message.success("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Failed to create recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (imageUrl) => {
    handleChange("recipeImg", imageUrl);
  };

  return (
    <>
      <Navbar />
      <div className="createRecipeContainer">
        <p className="sectionHeading">Create Your Recipe</p>
        <Form onFinish={handleSubmit} className="createRecipeForm">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input
              placeholder="Recipe Name"
              value={recipe.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please input the description!" }]}
          >
            <Input.TextArea
              placeholder="Description"
              value={recipe.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
            />
          </Form.Item>

          <Form.Item name="ingredients">
            <div>
              {recipe.ingredients.map((ingredient, index) => (
                <Tag
                  key={index}
                  closable
                  onClose={() => handleRemoveIngredient(index)}
                  style={{ margin: "4px", borderRadius: "5px", backgroundColor: "#000", color: "#333" }}
                >
                  <Input
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(e.target.value, index)}
                    style={{ backgroundColor: "#fff", border: "none" }}
                  />
                </Tag>
              ))}
              <Button
                type="primary"
                onClick={handleAddIngredient}
                style={{ marginTop: 8, borderColor: "#ffdd57", color: "#ffdd57" }}
              >
                Add Ingredient
              </Button>
            </div>
          </Form.Item>

          <Form.Item
            name="instructions"
            rules={[{ required: true, message: "Please input the instructions!" }]}
          >
            <Input.TextArea
              placeholder="Instructions"
              value={recipe.instructions}
              onChange={(e) => handleChange("instructions", e.target.value)}
              rows={4}
            />
          </Form.Item>

          <Form.Item name="recipeImg">
            <Input
              placeholder="Image URL (for image upload)"
              disabled
              value={recipe.recipeImg}
            />
            <UploadWidget onImageUpload={handleImageUpload} />
          </Form.Item>

          <Form.Item
            name="cookingTime"
            rules={[{ required: true, message: "Please input the cooking time!" }]}
          >
            <Input
              type="number"
              placeholder="Cooking Time (minutes)"
              value={recipe.cookingTime}
              onChange={(e) => handleChange("cookingTime", e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} style={{ backgroundColor: "#ff5e57", borderColor: "#ff5e57" }}>
              {isLoading ? <Spinner /> : "Create Recipe"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateRecipe;
