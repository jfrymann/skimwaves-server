import express from "express";
import spots from './routes/spots.js'
import cors from "cors"

const port = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(spots);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})