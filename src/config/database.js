/**Configuração do MongoDB
 * para esse teste sera usado o MongoDB Atlas
 */

const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dlweq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Conexão com o Atlas bem sucedida!")
  );
} catch (e) {
  console.log("Problema na conexão!");
}

module.exports = mongoose.connection;
