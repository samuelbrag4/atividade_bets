import { Router } from "express";

// Lista de importação das rotas dos suspeitos
import suspeitosRoutes from "./suspeitos.routes.js";

const routes = Router();

// Rota raiz para testes
routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Bem vindo ao S.C.S (Sistema de Cadastro de Suspeitos)" });
});

// Lista de uso das rotas do projeto
routes.use("/suspeitos", suspeitosRoutes);

export default routes;