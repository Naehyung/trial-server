import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import messageRoutes from "./routes/message.js";

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, "192.168.1.100", () =>
      console.log(`Server running on port: ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
mongoose.set("useFindAndModify", false);
