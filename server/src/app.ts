import express from "express";
import cors from "cors";
import credentials from "./credentials";
import mongoose from "mongoose";
import clientRoutes from "./routes/clientRoutes";
import devRoutes from "./routes/devRoutes";
import serviceRoutes from "./routes/serviceRoutes";

mongoose
  .connect(credentials.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Conectei a base de dados.");
    app.emit("pronto");
  })
  .catch((e) => console.log(e));

const app = express();

app.use(cors());
app.use(express.json());
app.use("/clients/", clientRoutes);
app.use("/devs/", devRoutes);
app.use("/services/", serviceRoutes);

export default app;
