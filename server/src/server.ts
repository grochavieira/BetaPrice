import app from "./app";
import credentials from "./credentials";

app.listen(credentials.PORT, () => {
  console.log(`Listening to port ${credentials.PORT}`);
});
