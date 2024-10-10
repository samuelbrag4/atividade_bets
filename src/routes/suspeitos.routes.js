import { Router } from "express";

const suspeitosRoutes = Router();

// Array com suspeitos pré-cadastrados
let suspeitos = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Felipe Dev Aleatório",
    profissao: "Dev",
    envolvimento: "Sim",
    suspeita: "Médio",
  },
];

// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
  return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
  const { nome, profissao, envolvimento, suspeita } = req.body;

  // Validação dos campos nome e profissao
  if (!nome || !profissao) {
    return res.status(400).send({
      message: "É obrigatório que o nome e profissão do suspeito sejam inseridos!",
    });
  }

  // Validação de nivel de suspeita
  if (suspeita != "Baixo" && suspeita != "Médio" && suspeita != "Alto") {
    return res.status(400).send({
      message:
        "A classificação do nível de suspeita do suspeito é obrigatória! Exiba se o seu nível é Baixo, Médio ou Alto.",
    });
  }

  // Criação de um novo suspeito
  const novoSuspeito = {
    id: Math.floor(Math.random() * 1000000),
    nome,
    profissao,
    envolvimento,
    suspeita,
  };

  // Adicionando o novo suspeito ao array de suspeitos
  suspeitos.push(novoSuspeito);

  return res.status(201).json({
    message: "O novo suspeito foi cadrastado! Boa sorte na investigação 😉!",
    novoSuspeito,
  });
});

// Rota para buscar um suspeito pelo seu id
suspeitosRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((suspeito) => suspeito.id == id);

  // Verifica se o suspeito foi encontrado, e exibe uma mensagem caso ele não tenha sido encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não foi encontrado! Verifique se ele foi cadastado.` });
  }

  return res.status(200).json(suspeito);
});

// Rota para atualizar algum suspeito pelo seu id
suspeitosRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, profissao, envolvimento, suspeita } = req.body;

  // Busca um suspeito pelo seu id no array de suspeitos
  const suspeito = suspeitos.find((suspeito) => suspeito.id == id);

  // Verifica se o suspeito foi encontrado e envia uma mensagem de verificação
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não foi encontrado! Verifique se ele foi cadastrado corretamente.` });
  }

  // Validação dos campos nome e profissao
  if (!nome || !profissao) {
    return res.status(400).send({
      message: "O nome ou o profissao não foi preenchido! Preencha para prosseguir!",
    });
  }

  suspeito.nome = nome;
  suspeito.profissao = profissao;
  suspeito.envolvimento = envolvimento;
  suspeito.suspeita = suspeita;

  return res.status(200).json({
    message: "suspeito atualizado com sucesso! Boa sorte na sua investigação 😉!",
    suspeito,
  });
});

// Rota para deletar um suspeito pelo seu id
suspeitosRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um suspeito pelo id no array de suspeitos
  const suspeito = suspeitos.find((suspeito) => suspeito.id == id);

  // Verifica se o suspeito foi encontrado
  if (!suspeito) {
    return res
      .status(404)
      .json({ message: `suspeito com id ${id} não foi encontrado! Verifique se ele foi cadastrado corretamente!` });
  }

  // Remove o suspeito do array de suspeitos após o delete ser executado
  suspeitos = suspeitos.filter((suspeito) => suspeito.id != id);

  return res.status(200).json({
    message: "suspeito removido com sucesso! Boa sorte na sua investigação 😉!",
    suspeito,
  });
});

export default suspeitosRoutes;