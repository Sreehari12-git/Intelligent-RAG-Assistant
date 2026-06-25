# Intelligent RAG Assistant

A **Node.js** based Retrieval‑Augmented Generation (RAG) assistant that leverages **LangChain**, **Google Gemini**, **ChromaDB**, and **Tavily** to answer questions over uploaded documents (PDF, DOCX, TXT, etc.).

---

## ✨ Features
- 📄 **Document ingestion** – Upload files (PDFs, Word documents, text files, etc.) via the `/upload` endpoint.
- 🧠 **Vector store** – Document embeddings are generated using `@langchain/google-genai` and stored in a **Chroma** collection for fast similarity search.
- 🤖 **LLM powered** – Uses **Google Gemini** (via `@langchain/google-genai`) to generate context-aware answers.
- 🔀 **Intent Routing** – Automatically classifies user prompts into **chitchat** (greetings, small talk) or **query** (factual/search queries) using a hybrid rule-based and LLM classifier.
- 🔍 **Hybrid search / Web Fallback** – Combines vector similarity search with automated web search via **Tavily** when the uploaded documents do not contain relevant context. Web search results are indexed dynamically for future queries.
- 🕒 **Chat History** – Saves chat interactions mapped to a device ID (`deviceId`) into a PostgreSQL database using **Prisma ORM**.
- 🔐 **Authentication & RBAC** – Secure user management using JWT access and refresh tokens stored in HttpOnly cookies, with Role-Based Access Control (`ADMIN` vs `USER`).
- 🛠️ **Extensible** – Modular layout separating controllers, routes, loaders, and services.

---

## 🚀 Getting Started
### Prerequisites
- **Node.js** (>= 18)
- **npm** (>= 9)
- **PostgreSQL** database (for Prisma chat history & user management)
- A **Google Gemini API key**
- A **Tavily API key** (for web fallback search)
- A **Chroma** cloud/self-hosted instance and credentials

### Installation
```bash
# Clone the repository
git clone https://github.com/your‑org/Intelligent‑RAG‑Assistant.git
cd Intelligent‑RAG‑Assistant/backend

# Install dependencies
npm install
```

### Database Migration
Ensure PostgreSQL is running and your `DATABASE_URL` is set, then generate and run database migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Configuration
Create/update the `.env` file in the `backend` directory with the following keys:
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

### Run the server
```bash
# Start the server (runs server.js)
npm start
```

---

## 📡 API Endpoints

### 🔑 Authentication
| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| `POST` | `/auth/login` | None | Authenticates user, setting JWT tokens in secure HttpOnly cookies. |
| `GET` | `/auth/me` | None | Retrieves user profile details if a valid token session exists. |
| `POST` | `/auth/logout` | None | Clears authentication cookies. |

### 📄 Ingestion & Chat
| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| `POST` | `/upload` | None | Accepts multipart file uploads. Stores, splits, embeds, and indexes documents into ChromaDB. |
| `POST` | `/ask` | None | Processes `{ question, deviceId }`. Classifies intent, retrieves context, queries the LLM, logs history to database, and returns the response. |
| `GET` | `/history` | None | Retrieves chat history using `?deviceId=...`. |

### 🛠️ Document Management (Admin only)
| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| `GET` | `/document/view-all` | Yes (`ADMIN` role) | Lists all document filenames currently indexed in the vector database. |
| `DELETE` | `/document/delete` | Yes (`ADMIN` role) | Deletes all chunks/records associated with a given `fileName` (body: `{ fileName }`). |

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or pull request.

---

## 📄 License
This project is licensed under the **ISC** license.
