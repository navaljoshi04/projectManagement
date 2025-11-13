import express from "express";
import dotenv from "dotenv";
import connectWithDB from "./config/database.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);
app.use("/team", teamRoutes);

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectWithDB();
    app.listen(PORT, () => {
      console.log(`PORT is successfully running on ${PORT}`);
    });
  } catch (error) {
    console.log("server connection error: ", error.message);
  }
};

startServer();
