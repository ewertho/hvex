const User = require("../model/user");

module.exports = {
  insert(req, res) {
    //desestruturação do que vier do body
    const { identificador, nome, nome_de_usuario, senha } = req.body;

    //procura na base pra ver se não tem usuario com mesmo identificador
    try {
      User.findOne({ identificador }, (err, user) => {
        if (err) {
          return res.status(500).send({ erro_na_procura: err });
        }
        if (user) {
          return res
            .status(400)
            .send({ errors: "usuario ja cadastrado", data: user });
        } else {
          const user = new User({
            identificador,
            nome,
            nome_de_usuario,
            senha,
          });

          try {
            user.save((err, user) => {
              if (err) {
                return res.status(500).send({ erro_na_insercao: err });
              } else {
                res.status(200).json({
                  success: "usuario inserido com sucesso",
                  usuario: user,
                });
              }
            });
          } catch (error) {
            res.json({
              success: false,
              erro: error,
            });
          }
        }
      });
    } catch (error) {
      res.json({
        erros: false,
        erro: error,
      });
    }
  },

  async read(req, res) {
    const { identificador } = req.body;

    try {
      const user = await User.findOne({ identificador });

      if (user) {
        return res.status(500).send({ message: "Usuario não cadastrado!" });
      } else {
        return res.status(200).json({ usuario: user });
      }
    } catch (error) {
      res.json({
        erro: error,
      });
    }
  },
  async update(req, res) {
    const { identificador, nome, nome_de_usuario, senha } = req.body;

    const naovazios = {};

    if (nome != undefined) naovazios.nome = nome;
    if (nome_de_usuario != undefined)
      naovazios.nome_de_usuario = nome_de_usuario;
    if (senha != undefined) naovazios.senha = senha;
    console.log(naovazios);

    await User.findOneAndUpdate(
      { identificador },
      naovazios,
      { new: true, runValidators: true },
      (err, user) => {
        if (err) {
          return res.status(500).send({ erro: err });
        }
        if (user) {
          return res.status(200).json({ usuario: user });
        }
      }
    );
  },
  async destroy(req, res) {
    const { identificador } = req.body;
    await User.findOneAndDelete({ identificador }, (err) => {
      if (err) {
        return res.status(500).send({ erro: err });
      } else {
        return res
          .status(200)
          .json({ message: "usuario excluido com sucesso!" });
      }
    });
  },
};
