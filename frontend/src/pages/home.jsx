import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Button, Card, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar.jsx";
import "../styles/home.css";
import { useSelector } from "react-redux";
import API_BASE_URL from "../api.js";
import RecipeDetailsModal from "../components/RecipeDetailsModal.jsx";

const { Meta } = Card;

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedRecipeDetails, setSelectedRecipeDetails] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const userID = currentUser.data.data.user._id;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/recipe`);
        setRecipes(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [userID]);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return description;
  };

  const getMoreDetailsOfRecipe = async (recipeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/recipe/${recipeId}`);
      setSelectedRecipeDetails(response.data.data);
      setDetailsModalVisible(true);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch recipe details");
    }
  };

  const closeModal = () => {
    setDetailsModalVisible(false);
    setSelectedRecipeDetails({});
  };

  return (
    <>
      <Navbar />
      <div className="homeContainer container">
        <p className="sectionHeading">Recipes</p>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
          }}
          dataSource={recipes}
          renderItem={(recipe) => (
            <List.Item>
              <Card
                className="enhancedRecipeCard"
                cover={<img alt={recipe.name} src={recipe.recipeImg} className="recipeImage" />}
                hoverable
                actions={[
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownOutlined />}
                    onClick={() => getMoreDetailsOfRecipe(recipe._id)}
                  >
                    Read More
                  </Button>,
                ]}
              >
                <Meta
                  title={<span className="cardTitle">{recipe.name}</span>}
                  description={truncateDescription(recipe.description)}
                />
              </Card>
            </List.Item>
          )}
        />
        <RecipeDetailsModal
          visible={detailsModalVisible}
          onCancel={closeModal}
          recipeDetails={selectedRecipeDetails}
        />
      </div>
    </>
  );
}
