import express from "express"
import uploadRoutes from "./routes/upload.js"
import askRoutes from "./routes/chatRoute.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(express.json())
app.use("/", uploadRoutes);
app.use("/", askRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});

