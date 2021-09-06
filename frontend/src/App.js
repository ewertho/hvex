import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [nome_de_usuario, setNome_de_usuario] = useState("");
  const [senha, setSenha] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [usuario, setUsuario] = useState(false);

  function formCreate() {
    try {
      axios
        .post("http://localhost:5000/create", {
          identificador,
          nome,
          nome_de_usuario,
          senha,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function formRead() {
    try {
      axios
        .post("http://localhost:5000/read", {
          identificador,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function formUpdate() {
    try {
      axios
        .post("http://localhost:5000/update", {
          identificador,
          nome,
          nome_de_usuario,
          senha,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function formDelete() {
    try {
      axios
        .post("http://localhost:5000/delete", {
          identificador,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <input
        value={identificador}
        onChange={(event) => {
          setIdentificador(event.target.value);
        }}
        placeholder="identificador"
      />
      <input
        value={nome}
        onChange={(event) => {
          setNome(event.target.value);
        }}
        placeholder="nome"
      />
      <input
        value={nome_de_usuario}
        onChange={(event) => {
          setNome_de_usuario(event.target.value);
        }}
        placeholder="usuario"
      />
      <input
        value={senha}
        onChange={(event) => {
          setSenha(event.target.value);
        }}
        placeholder="senha"
      />
      <div>
        <button type="submit" onClick={formCreate}>
          Criar
        </button>
        <button type="submit" onClick={formUpdate}>
          Atualizar
        </button>
        <button type="submit" onClick={formRead}>
          ler
        </button>
        <button type="submit" onClick={formDelete}>
          Deletar
        </button>
      </div>
    </div>
  );
}

export default App;
