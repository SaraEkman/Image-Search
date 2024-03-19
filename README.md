# Project Title: Image Search with Auth0 and Google Custom Search
## Project Description
This project is a full-stack application that enables image search using the Google Custom Search API. Users can log in with their Google or GitHub accounts via Auth0, search for images, see search results with a maximum of 10 images, and save favorite images in a personal list. The application is built with React and TypeScript on the client side, and Node.js with Express on the server side.

## Features
- Authentication: Users can log in using their Google or GitHub accounts through Auth0.
- Image Search: Logged-in users can search for images using the Google Custom Search API. A maximum of 10 images are displayed.
- Search Suggestions: "Did you mean..." suggestions are displayed for misspelled search terms.
- Search Time: The time it takes for a search to be conducted is displayed.
- Save Favorite Images: Users can save images and add them to a personal list of favorite images.
- View Favorite Images: Users can view their list of favorite images.

## Server Features
- A JSON file on the server stores a list of users and their favorite images.
- An endpoint to save a favorite image with Joi validation of incoming data.
- An endpoint that responds with a list of favorite images belonging to a specific user.

## Technologies
- Frontend: React, TypeScript, Tailwind CSS for styling.
- Backend: Node.js, Express, Joi for data validation.
- Authentication: Auth0.
- Search Engine: Google Custom Search API.


## Preparations
Before running the application, ensure to create .env files in both the client and server with necessary configuration variables, including API keys.
- VITE_AUTH0_DOMAIN: Auth0 domain.
- VITE_AUTH0_CLIENT_ID: Auth0 client ID.
- VITE_API_URL: Server's URL.

## How to Run the Project
- Clone the repository: git clone https://github.com/SaraEkman/Image-Search.git
- Install dependencies:
For server: cd server && npm install
For client: cd client && npm install
- Start the server: npm start & nodemon start from the server folder.
- Start the client application: npm run dev from the client folder.