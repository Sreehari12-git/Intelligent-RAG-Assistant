# Intelligent RAG Assistant

An end-to-end Retrieval-Augmented Generation (RAG) assistant application consisting of a **React/Vite** frontend and a **Node.js (Express)** backend. It leverages **LangChain**, **Google Gemini**, **ChromaDB**, and **Tavily** to answer user queries over uploaded documents (PDF, DOCX, TXT) with an automated web search fallback.

---

## 📁 Repository Structure

```
├── backend/       # Express API server (LLM chain, ingestion, DB logging)
├── frontend/      # React client application (Vite, Tailwind CSS)
└── README.md      # Root documentation (this file)
```

---

## ✨ Features

- 📄 **Document Ingestion** – Upload multiple documents (PDFs, Word documents, text files) to ingest, split, embed, and index them into a **ChromaDB** collection.
- 🧠 **Smart Vector Store** – Document embeddings are generated via `@langchain/google-genai` and stored for similarity search.
- 🤖 **LLM-Powered Answers** – Utilizes **Google Gemini** (via `@langchain/google-genai`) to generate context-aware answers.
- 🔀 **Intent Routing** – Automatically routes user inputs into **chitchat** (casual talk) or **query** (factual/search queries) via a hybrid rule/LLM classifier.
- 🔍 **Hybrid Search & Web Fallback** – Automatically queries the web via **Tavily** when uploaded documents do not contain relevant context, dynamically indexing web results for future queries.
- 🕒 **Chat History** – Saves chat history mapped to a `deviceId` into a PostgreSQL database using **Prisma ORM**.
- 🔐 **Role-Based Access Control** – Secure JWT authentication (Access & Refresh tokens) with role checks (`ADMIN` vs `USER`). Admins can list and delete indexed documents.

---

## 🛠️ Technology Stack

### Backend
- **Core:** Node.js, Express
- **RAG & LLM:** LangChain, Google Gemini API
- **Vector Database:** ChromaDB
- **Search API:** Tavily API (Fallback)
- **Database & ORM:** PostgreSQL, Prisma ORM
- **Security:** JWT (stored in HttpOnly cookies)

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Markdown Rendering:** React Markdown

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (>= 18)
- **npm** (>= 9)
- **PostgreSQL** instance
- **API Keys:** Google Gemini API Key, Tavily API Key, ChromaDB credentials

---

### 📦 Installation

Clone the repository and install dependencies for both services:

```bash
# Clone the repository
git clone https://github.com/your-org/Intelligent-RAG-Assistant.git
cd Intelligent-RAG-Assistant

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### ⚙️ Environment Configuration

#### Backend Setup (`backend/.env`)
Create a `.env` file in the `backend/` directory:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
CHROMA_API_KEY=your_chroma_api_key
CHROMA_TENANT=your_chroma_tenant_id
CHROMA_DATABASE=your_chroma_database_name
TAVILY_API_KEY=your_tavily_api_key
DATABASE_URL="postgresql://username:password@localhost:5432/rag"
JWT_ACCESS_SECRET="your_jwt_access_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"
FRONTEND_URL="http://localhost:4000"
```

#### Frontend Setup (`frontend/.env`)
Create a `.env` file in the `frontend/` directory (if required by your configuration).

---

### 🗄️ Database Setup (Backend)

Ensure your PostgreSQL instance is running and your `DATABASE_URL` is set in the backend env, then run:
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

---

### 🏃 Running the Application

You will need to run the backend and frontend servers simultaneously.

#### Start the Backend Server:
```bash
cd backend
npm start
```
*The backend server will run on `http://localhost:3000` (or the configured `PORT`).*

#### Start the Frontend Server:
```bash
cd frontend
npm run dev
```
*The frontend development server will run on the port specified by Vite (usually `http://localhost:5173` or `http://localhost:4000`).*

---

## 📡 Backend API Reference

### 🔑 Authentication
- `POST /auth/login` - Authenticate user, setting JWT tokens in secure HttpOnly cookies.
- `GET /auth/me` - Retrieve user profile details if a valid token session exists.
- `POST /auth/logout` - Clear authentication cookies.

### 📄 Ingestion & Chat
- `POST /upload` - Upload documents. Stores, splits, embeds, and indexes documents into ChromaDB.
- `POST /ask` - Processes `{ question, deviceId }`. Classifies intent, retrieves context, queries Gemini, logs history, and returns the response.
- `GET /history` - Retrieve chat history using `?deviceId=...`.

### 🛠️ Document Management (Admin only)
- `GET /document/view-all` - Lists all document filenames currently indexed in the vector database.
- `DELETE /document/delete` - Deletes all chunks/records associated with a given `fileName` (body: `{ fileName }`).
