# 🎬 Vite React RMDB

A modern movie discovery application built with React and Vite, featuring real-time search, trending movies tracking, and seamless integration with TMDB API and Appwrite.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-21.5.0-F02E65?logo=appwrite&logoColor=white)

## ✨ Features

- 🔍 **Real-time Movie Search** - Search movies with debounced input for optimal performance
- 📊 **Trending Movies** - Track and display the top 5 most searched movies
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 💾 **Data Persistence** - Store search metrics using Appwrite TablesDB
- 🎭 **Hero Section** - Showcase popular movies with dynamic hero images

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) 19.2.0
- **Build Tool**: [Vite](https://vitejs.dev/) 7.2.4
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4.1.17
- **Backend**: [Appwrite](https://appwrite.io/) 21.5.0 (TablesDB)
- **API**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **Utilities**: [react-use](https://github.com/streamich/react-use) for debouncing

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))
- Appwrite account ([Sign up here](https://cloud.appwrite.io/))

## 🚀 Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd vite-react-rmdb
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# TMDB API Configuration
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_table_id
VITE_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
```

### 4. Appwrite Setup

1. **Create a Database**:
   - Go to your Appwrite Console
   - Navigate to Databases → Create Database
   - Copy the Database ID

2. **Create a Table**:
   - Inside your database, create a new table (e.g., "metrics")
   - Copy the Table ID (or use the table name)

3. **Configure Table Columns**:
   Create the following columns in your table:
   - `searchTerm` (String) - The search query
   - `count` (Integer) - Number of times searched
   - `movie_id` (Integer) - TMDB movie ID
   - `poster_url` (String) - Movie poster URL

4. **Set Permissions**:
   - Go to Table Settings → Permissions
   - Enable "Any" role with Create, Read, Update, Delete permissions
   - Click "Update" to save

5. **Configure Platform**:
   - Go to Settings → Platforms
   - Add your platform (e.g., "React app")
   - Set hostname to `*` (or add `http://localhost:5173` for development)

### 5. Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
vite-react-rmdb/
├── public/              # Static assets
│   ├── hero.png         # Hero section image
│   └── hero-bg.png      # Hero background image
├── src/
│   ├── components/      # React components
│   │   ├── Hero.jsx     # Hero section component
│   │   ├── MovieCard.jsx # Movie card component
│   │   ├── Search.jsx   # Search input component
│   │   └── Spinner.jsx  # Loading spinner
│   ├── App.jsx          # Main application component
│   ├── appwrite.js      # Appwrite configuration and functions
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── .env                 # Environment variables (not in git)
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🔌 API Endpoints

### TMDB API

- **Base URL**: `https://api.themoviedb.org/3`
- **Search Movies**: `GET /search/movie?query={query}`
- **Discover Movies**: `GET /discover/movie?include_adult=false&sort_by=popularity.desc`

### Appwrite TablesDB

- **Base URL**: Configured in `appwrite.js` (default: `https://nyc.cloud.appwrite.io/v1`)
- **List Rows**: `GET /tablesdb/{databaseId}/tables/{tableId}`
- **Create Row**: `POST /tablesdb/{databaseId}/tables/{tableId}`
- **Update Row**: `PUT /tablesdb/{databaseId}/tables/{tableId}/{rowId}`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Functions

### `updateSearchCount(searchTerm, movie)`
Tracks search queries by:
- Checking if the search term already exists
- Incrementing the count if found
- Creating a new row if not found

### `getTrendingMovies()`
Retrieves the top 5 most searched movies sorted by count in descending order.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TMDB_API_KEY` | Your TMDB API key | Yes |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite project ID | Yes |
| `VITE_APPWRITE_DATABASE_ID` | Appwrite database ID | Yes |
| `VITE_APPWRITE_COLLECTION_ID` | Appwrite table ID or name | Yes |
| `VITE_APPWRITE_ENDPOINT` | Appwrite endpoint URL | Yes |

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder will contain the production-ready files.

### Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Add Secrets**:
   - Go to Settings → Secrets and variables → Actions
   - Add the following repository secrets:
     - `VITE_TMDB_API_KEY`
     - `VITE_APPWRITE_PROJECT_ID`
     - `VITE_APPWRITE_DATABASE_ID`
     - `VITE_APPWRITE_COLLECTION_ID`
     - `VITE_APPWRITE_ENDPOINT`

3. **Update Base Path** (if needed):
   - If deploying to `username.github.io/repo-name`, the base path is already configured as `/repo-name/`
   - If deploying to a custom domain or root (`username.github.io`), set the `VITE_BASE_PATH` environment variable to `/` in your GitHub Actions secrets
   - Or update `vite.config.js` directly to change the default base path

4. **Deploy**:
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy
   - Your site will be available at `https://username.github.io/vite-react-rmdb/`

#### Manual Deployment:

```bash
npm run build
# Then push the dist folder to the gh-pages branch
```

### Deploy to Vercel/Netlify

1. Push your code to GitHub
2. Import the project in Vercel/Netlify
3. Add environment variables in the platform settings
4. Deploy!


## 🤝 Contributing

This is a private project. Contributions are not currently accepted.

