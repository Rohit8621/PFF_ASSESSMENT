# PFF_ASSESSMENT
------------------Pokédex----------------
Discover and explore the world of Pokémon

Pokémon App
A simple and visually appealing Pokémon app that allows users to view, search, filter, and sort Pokémon. The app also provides detailed information about each Pokémon, including its stats and similar Pokémon based on type.

🌟 Features
Frontend
Home Page (/home):

Displays a paginated list of Pokémon (10 per page).
Includes search functionality by Pokémon name.
Allows filtering Pokémon by type (e.g., Grass, Fire, Water).
Supports sorting Pokémon by name.
Clicking a Pokémon redirects to its detail page.
Pokémon Page (/pokemon/<id>):

Displays the selected Pokémon's ID, image, name, type, height, and weight.
Shows stats such as HP, Attack, Defense, Special Attack, and Special Defense.
Lists similar Pokémon based on type, displaying their ID, name, image, and type.
Backend
REST APIs for fetching Pokémon data from a relational database.
Data seeded from PokeAPI.
Deployment
Hosted on Netlify: Live Demo
🛠 Tech Stack
Frontend
Framework: React
Styling: Tailwind CSS
Hosting: Netlify
Backend
Framework: Node.js with Express
Database: PostgreSQL
Hosting: Render (or your chosen backend host)
⚙️ Pre-requisites
To run the app locally, ensure you have the following installed:

Node.js (v16 or later)
PostgreSQL (v14 or later)
🚀 Running the App
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/pokemon-app.git  
cd pokemon-app  
2. Set up the backend
Install dependencies:

bash
Copy
Edit
cd backend  
npm install  
3. Set up the frontend
Install dependencies:
bash
Copy
Edit
cd ../frontend  
npm install  
Start the development server:
bash
Copy
Edit
npm start  
4. Access the app
Open your browser and navigate to: http://localhost:3000
🌱 Database Setup and Seeding
Use the Pokémon data from PokeAPI to seed your PostgreSQL database.
Database schema includes tables for Pokémon, stats, and types for relational mapping.
📝 Improvisations
Clean and visually appealing UI with Tailwind CSS for styling.
Responsive design for optimal viewing on all devices.
Deployed the app on a free hosting platform (Netlify).
🏆 Bonus Features
Clean, maintainable, and readable codebase.
Visually engaging design.
Paginated data for better performance and usability.
📚 Resources
PokeAPI Documentation
Netlify Hosting
📄 License
This project is licensed under the MIT License.

