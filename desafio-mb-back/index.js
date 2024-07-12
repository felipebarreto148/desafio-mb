import { hasEmptyFields } from "./src/utils/validate.js"
import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

let fields = {};

app.get('/registration', (req, res) => {
  res
    .status(200)
    .json({
      status: 200,
      fields
    });
});

app.post('/registration', (req, res) => {
  if (hasEmptyFields(req.body)) {
    return res
    .status(400)
    .json({
      status: 400,
      message: "Preencha todos os campos obrigatórios."
    });
  }
  fields = { ...fields, ...req.body }
  return res
    .status(201)
    .json({
      status: 201,
      message: "Registro salvo com sucesso!"
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})