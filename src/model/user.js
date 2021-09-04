const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  identificador: { type: String, unique: true, require: true },
  nome: { type: String, required: true },
  nome_de_usuario: { type: String, required: true },
  senha: { type: String, required: true },
  ultimo_acesso: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
