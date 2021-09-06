const User = require("../model/user");

/**
 * Foi optado por sempre que não existir usuario numa consulta retorna o status
 * 200 e nulo ao inves de operar com status 404 ou status 204.
 */

/**
 * Recebe a requisição contendo os dados do usuario e retorna um json com os dados
 * e o status 201 em caso de bem sucedido. retorna erro e status 500 em caso de erro 
 * na gravação ou acesso ao banco. caso ja tenha o usuario retorna status 200 e o usuario que foi encontrado
 *  
 */
async function insert(req, res) {
  const { identificador, nome, nome_de_usuario, senha } = req.body;
  
  try {
    const haveUser = await User.findOne({ identificador });
    if (haveUser != null) {
      return res.status(200).json(haveUser);
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
        res.status(500).json(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
}


/**
 * recebe o identificador, e retorna o status 200 com o json do usuario em
 * caso de haver o usuario na base
 * ou status 200 com nulo em caso de não haver usuario na base de dados.
 * retorna status 500 com o erro caso tenha erro na consulta a base
 */
async function read(req, res) {
  const { identificador } = req.body;

  try {
    const user = await User.findOne({ identificador });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}


/**
 * Recebe a requisição com os atributos a serem inseridos na base. 
 * Faz o tratamento para verficar quais atributos estão vazios
 * coloca todos os atributos não vazios em um objeto.
 * Faz a consulta para ver se ja existe o usuario com o identificador, caso não exista retorna
 * o status 200 com nulo. caso não exista faz a atualização e retorna o status 200
 * com o usuario e os parametros ja modificados
 */
async function update(req, res) {
  const { identificador, nome, nome_de_usuario, senha } = req.body;

  const naovazios = {};

  if (nome != "") naovazios.nome = nome;
  if (nome_de_usuario != "") naovazios.nome_de_usuario = nome_de_usuario;
  if (senha != "") naovazios.senha = senha;

  try {
    const haveUser = await User.findOne({ identificador });
    if (haveUser != null) {
      await User.updateOne({ identificador }, naovazios, {
        new: true,
      });
      const newUser = await User.findOne({ identificador });
      return res.status(200).json(newUser);
    } else {
      return res.status(200).json(haveUser);
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}


/**
 * Recebe o identificador e verifica se ja existe o usuario na base de dados
 * caso não exista, retorna status 200 com nulo. Caso exista, remove o usuario da
 * base e retorna o status 200 com o identificador de deleção.
 */
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
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = { insert, read, update, destroy };
