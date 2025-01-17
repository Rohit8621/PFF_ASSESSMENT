# PFF_ASSESSMENT
------------------Pokédex----------------
Discover and explore the world of Pokémon

# Pokémon App  

A simple and visually appealing Pokémon app that allows users to view, search, filter, and sort Pokémon. The app also provides detailed information about each Pokémon, including its stats and similar Pokémon based on type.  

## 🌟 Features  

### Frontend  
- **Home Page (/home):**  
  - Displays a paginated list of Pokémon (10 per page).  
  - Includes search functionality by Pokémon name.  
  - Allows filtering Pokémon by type (e.g., Grass, Fire, Water).  
  - Supports sorting Pokémon by Name and ID.  
  - Clicking a Pokémon redirects to its detail page.  

- **Pokémon Page (/pokemon/<id>):**  
  - Displays the selected Pokémon's ID, image, name, type, height, and weight.  
  - Shows stats such as HP, Attack, Defense, Special Attack, and Special Defense.  
  - Lists similar Pokémon based on type, displaying their ID, name, image, and type.  

### Backend  
- REST APIs for fetching Pokémon data from a relational database.  
- Data seeded from [PokeAPI](https://pokeapi.co/).  

### Deployment  
- Hosted on [Netlify](https://www.netlify.com/): [Live Demo](https://rohitpookiepff.netlify.app/)  

---

## 🛠 Tech Stack  

### Frontend  
- **Framework:** React  
- **Styling:** Tailwind CSS  
- **Hosting:** Netlify  

### Backend  
- **Framework:** Node.js with Express  
- **Hosting:** Render (or your chosen backend host)  

---

## ⚙️ Pre-requisites  

To run the app locally, ensure you have the following installed:  
1. **Node.js** (v16 or later)  

---

## 🚀 Running the App  

### 1. Clone the repository  
```bash
git clone https://github.com/yourusername/pokemon-app.git  
cd pokemon-app
```
###2. How To RUn
Install dependencies:
```bash
cd backend  
npm install
npm run dev  

