import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();

const db =
  "mongodb+srv://grochavieira:grochavieira1804@cluster.hrlm8.mongodb.net/DEVNINJAS?retryWrites=true&w=majority";

mongoose
  .connect(db, {
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
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
