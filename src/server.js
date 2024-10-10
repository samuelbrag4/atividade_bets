import express from "express";
import { config } from "dotenv";

// Importação da rota
import routes from "./routes/index.routes.js";

config();

// Variável da porta do servidor
const serverPort = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(routes);

// Console que mostra se o servidor está funcionando
app.listen(serverPort, () => {
  console.log(`🚀 Server started on http://localhost:${serverPort}`);
});