Airbnb Clone (Small-Scale)-"WanderLust"

A full-stack MVC web application replicating core features of Airbnb. Built with Node.js, Express, MongoDB, and EJS, this application allows users to browse property listings, create and edit their own listings, upload property images, and leave reviews.
https://vacation-rental-villas.onrender.com   (WanderLust website available here)

Features:-
* User Authentication & Authorization: Secure signup, login, and route protection using Passport.js.
* Listing Management (CRUD): Create, view, update, and delete property listings.
* Review System: Add and delete star ratings and text reviews on property listings.
* Cloud Image Uploads: Cloudinary integration via Multer for hosting property images.
* Data Validation: Client-side and server-side schema validations using Joi.
  
 Tech Stack:-
* Backend: Node.js, Express.js
* Database: MongoDB (Mongoose ODM)
* Templating Engine: EJS (Embedded JavaScript) & EJS-Mate
* Authentication: Passport.js (Passport-Local)
* Storage: Cloudinary, Multer
* Validation: Joi

## Project Structure

* **`controllers/`** – Request handlers and core business logic.
* **`init/`** – Data initialization scripts and sample dataset.
* **`models/`** – Mongoose schemas (Listing, Review, User).
* **`public/`** – Static files (CSS, client-side JS, images).
* **`routes/`** – Express routes (listings, reviews, users).
* **`utils/`** – Helper functions and custom error handling classes.
* **`views/`** – EJS templates and layout files.
* **`app.js`** – Main application entry point and server setup.
* **`cloudconfig.js`** – Cloudinary storage configuration.
* **`middleware.js`** – Custom authentication and permission middleware.
* **`schema.js`** – Joi schema validations.

---

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Akankshasingh-14/Airbnb-small-scale-clone-.git](https://github.com/Akankshasingh-14/Airbnb-small-scale-clone-.git)
   cd Airbnb-small-scale-clone-
2.**Install Dependency:**
 npm install
3.**Configure Environment Variables:**
  PORT=8080
  ATLAS_URL=your_mongodb_connection_string
  CLOUD_NAME=your_cloudinary_cloud_name
  CLOUD_API_KEY=your_cloudinary_api_key
  CLOUD_API_SECRET=your_cloudinary_api_secret
  SECRET=your_session_secret_key
4.**Intialize Sample Data:**
   node init/index.js
5.**Start the Apllication**
    node app.js
Open your browser and navigate to http://localhost:8080/listings.

 ---
 
**Deployment:**
1.This application is deployed on Render. To deploy your own instance:
2.Create a Web Service on Render.
3.Connect your GitHub repository.
4.Set Build Command to npm install.
5.Set Start Command to node app.js.
6.Add all required environment variables (ATLAS_URL, CLOUD_NAME, CLOUD_API_KEY, 7.CLOUD_API_SECRET, SECRET) in the Render environment panel.

**Author:**
1.Akanksha Singh 
2.**Akankshasingh-14**
