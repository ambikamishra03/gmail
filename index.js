import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
import "./models/User.js";
import "./models/favouritemode.js";
import userRoute from "./routes/userroute.js";
app.use(userRoute);
import favouriteRoute from "./routes/favourite.js";
app.use(favouriteRoute);
mongoose
  .connect(
    "mongodb+srv://ambika123:Ambika123@cluster0.azle9og.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server is runnnig");
});
