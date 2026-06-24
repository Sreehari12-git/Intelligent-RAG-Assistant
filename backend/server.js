import express from "express"
import uploadRoutes from "./routes/upload.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import deleteRoutes from "./routes/delete.routes.js"
import viewRoutes from "./routes/view.routes.js"
import askRoutes from "./routes/chat.routes.js"
import cors from "cors"

dotenv.config()

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/", askRoutes)
app.use("/document", deleteRoutes);
app.use("/document", viewRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});

