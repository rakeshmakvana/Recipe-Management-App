# Recipe Management App

A fully functional Recipe Management App built with React, Node.js, Express, and MongoDB. This application allows users to create, view, update, and delete recipes, as well as manage user authentication.

## Features

- User authentication (login and signup)
- CRUD operations for recipes (create, read, update, delete)
- View individual and all recipes
- Responsive and modern UI using Ant Design
- Image storage with Cloudinary

## Technologies Used

### Frontend
- **Framework:** React (Vite)
- **UI Library:** Ant Design
- **State Management:** Redux
- **API Handling:** Axios

### Backend
- **Server:** Node.js with Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Image Storage:** Cloudinary

## Folder Structure

frontend/ ├── assets/ ├── components/ │ ├── Navbar.jsx │ ├── PrivateRoute.jsx │ ├── RecipeDetailsModel.jsx │ ├── RecipeEditModel.jsx │ ├── Spinner.jsx │ └── UploadWidget.jsx ├── pages/ │ ├── CreateRecipe.jsx │ ├── Home.jsx │ ├── MyRecipes.jsx │ └── auth/ │ ├── LoginForm.jsx │ └── RegisterForm.jsx ├── redux/ │ ├── store.js │ └── userSlice.js ├── styles/ │ ├── authLayout.css │ ├── createRecipe.css │ ├── home.css │ ├── navbar.css │ └── register.css ├── api.js ├── App.jsx ├── index.css └── main.jsx

### Backend

backend/ ├── controllers/ │ ├── recipe.controller.js │ └── user.controller.js ├── db/ ├── models/ │ ├── recipe.model.js │ └── user.model.js ├── routes/ │ ├── user.route.js │ └── recipe.route.js └── utils/ ├── ApiError.js ├── ApiResponse.js └── asyncHandler.js


### Clone the Repository
```bash
git clone https://github.com/rakeshmakvana/Recipe-Management-App.git
cd recipe-management-app
```


## Getting Started

## frontend
cd frontend
npm install
npm run dev

bash
npm install

bash
npm run dev


## Backend
cd backend
npm install
npm start

bash
npm install

bash
npm start


## API Endpoints

Login: POST /api/v1/users/login
Register: POST /api/v1/users/register
Create Recipe: POST /api/v1/recipe/create
Get All Recipes: GET /api/v1/recipe
Get Recipe by ID: GET /api/v1/recipe/:id
Update Recipe: PUT /api/v1/recipe/update/:id
Delete Recipe: DELETE /api/v1/recipe/delete/:id

## View URLs

API URL: http://localhost:3001
Frontend URL: http://localhost:5173

## Usage

Register a new user by sending a POST request to /api/v1/users/register with the username, email, and password.
Log in to your account by sending a POST request to /api/v1/users/login with your credentials.
Create, view, update, and delete recipes using the respective endpoints.

## Troubleshooting

If you encounter any issues while running the app, ensure that all dependencies are installed correctly and that your environment variables are set up. Check the console for any error messages and refer to the API documentation for correct endpoint usage.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
