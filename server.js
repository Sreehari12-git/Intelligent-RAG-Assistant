import express from "express"
import uploadRoutes from "./routes/upload.js"
import askRoutes from "./routes/chatRoute.js"

const app = express();

app.use(express.json())
app.use("/", uploadRoutes);
app.use("/", askRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

