# Intelligent RAG Assistant

A **Node.js** based Retrieval‑Augmented Generation (RAG) assistant that leverages **LangChain**, **Google Gemini**, **ChromaDB**, and **Tavily** to answer questions over uploaded documents (PDF, DOCX, TXT, etc.).

---

## ✨ Features
- 📄 **Document ingestion** – upload PDFs, Word files, or plain text via the `/upload` endpoint.
- 🧠 **Vector store** – embeddings are stored in a local **Chroma** collection for fast similarity search.
- 🤖 **LLM powered** – uses **Google Gemini** (via `@google/genai`) or any OpenAI compatible model through LangChain.
- 🔍 **Hybrid search** – combines vector similarity with optional keyword filtering via **Tavily**.
- 🛠️ **Extensible** – modular service layout (`services/`, `routes/`, `config/`).

---

## 🚀 Getting Started
### Prerequisites
- **Node.js** (>= 18)
- **npm** (>= 9)
- A **Google Gemini API key** (or OpenAI key if you switch the provider).

### Installation
```bash
# Clone the repo (if you haven't already)
git clone https://github.com/your‑org/Intelligent‑RAG‑Assistant.git
cd Intelligent‑RAG‑Assistant

# Install dependencies
npm install
```

### Configuration
Create a `.env` file in the project root (you already have one) with the following keys:
```
PORT=5000                # Port for the Express server
GOOGLE_API_KEY=your_key   # Google Gemini API key
CHROMA_PATH=./chroma     # Path where Chroma stores the collection
```
Adjust values as needed.

### Run the server
```bash
npm start   # or: node server.js
```
The server will listen on the port defined in `.env`.

---

## 📡 API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/upload` | Accepts multipart file upload. Stores the document, creates embeddings, and adds them to the Chroma collection. |
| `POST` | `/chat`   | Takes a JSON body `{ "question": "..." }` and returns a generated answer based on the uploaded documents. |

> **Note**: The routes are defined in `routes/upload.js` and `routes/chatRoute.js`.

---

## 🛠️ Development
- **Hot‑reloading** – use `npm run dev` with a tool like `nodemon` (add to `scripts` if desired).
- **Adding new loaders** – place a new file under `loaders/` and export a function that returns `Document[]`.
- **Changing LLM provider** – modify `services/llmService.js` to swap the underlying LangChain model.

---

## 📦 Deployment
1. Build a Docker image (example Dockerfile is provided in the repo).
2. Push the image to your container registry.
3. Deploy to any cloud platform that supports containers (AWS ECS, GCP Cloud Run, Azure Container Apps, etc.).

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or pull request.

---

## 📄 License
This project is licensed under the **ISC** license – see the `LICENSE` file for details.
