import express from "express";
import cors from "cors";
import credentials from "./credentials";
import mongoose from "mongoose";
import routes from "./routes";

mongoose
  .connect(credentials.DB, {
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

app.listen(credentials.PORT, () => {
  console.log(`Listening to port ${credentials.PORT}`);
});
