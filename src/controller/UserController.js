const User = require("../model/user");

async function insert(req, res) {
  const { identificador, nome, nome_de_usuario, senha } = req.body;

  try {
    const haveUser = await User.findOne({ identificador });
    if (haveUser != null) {
      return res.status(400);
    } else {
      try {
        const user = await User.create({
          identificador,
          nome,
          nome_de_usuario,
          senha,
        });

        res.status(201).json(user);
      } catch (error) {
        res.json(error);
      }
    }
  } catch (error) {
    res.json(error);
  }
}

async function read(req, res) {
  const { identificador } = req.body;

  try {
    const user = await User.findOne({ identificador });

    if (user === null) {
      return res.status(500);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({
      erro: error,
    });
  }
}

async function update(req, res) {
  const { identificador, nome, nome_de_usuario, senha } = req.body;

  const naovazios = {};

  if (nome != "") naovazios.nome = nome;
  if (nome_de_usuario != "") naovazios.nome_de_usuario = nome_de_usuario;
  if (senha != "") naovazios.senha = senha;

  try {
    const haveUser = await User.findOne({ identificador });
    if (haveUser != null) {
      const user = await User.updateOne({ identificador }, naovazios, {
        new: true,
      });
      return res.status(200).json(user);
    } else {
      return res.status(500);
    }
  } catch (error) {
    console.log(error);
  }
}

async function destroy(req, res) {
  const { identificador } = req.body;

  try {
    const haveUser = await User.findOne({ identificador });

    if (haveUser != null) {
      const user = await User.deleteOne({ identificador });

      return res.status(200).json(user);
    } else {
      return res.status(200).json(haveUser);
    }
  } catch (error) {}
}

module.exports = { insert, read, update, destroy };
