import React, { useState } from "react";

import axios from "axios";
import CardAtleta from "../components/CardAtleta.jsx"

export default function PesquisaAtleta({ adicionarFavorito }) {
  const [nome, setNome] = useState("");
  const [resultados, setResultados] = useState([]);
  const [idAtleta, setIdAtleta] = useState("");
  const [imageAtleta, setImageAtleta] = useState("")

  const buscarAtletas = async () => {
    const options = {
      method: 'GET',
      url: 'https://free-api-live-football-data.p.rapidapi.com/football-players-search',
      params: {
        search: nome
      },
      headers: {
        'x-rapidapi-key': '48397a59fdmsh1278e114ac4f7c6p1a7634jsn7b7b288d8c55',
        'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com'
      }
    };


    try {
      const response = await axios.request(options);

      setResultados(response.data.response.suggestions)
      // Precisa melhorar!!!! Está pegando apenas a posição 1 do array
      setIdAtleta(response.data.response.suggestions[0].id)

      // apenas debug
      console.log(response.data.response.suggestions)
      console.log(response.data.response.suggestions[0].id)
    } catch (error) {
      console.error(error);
    }
  };

  const buscarImagens = async () => {
    const options = {
      method: 'GET',
      url: 'https://free-api-live-football-data.p.rapidapi.com/football-get-player-logo',
      params: { playerid: idAtleta },
      headers: {
        'x-rapidapi-key': '48397a59fdmsh1278e114ac4f7c6p1a7634jsn7b7b288d8c55',
        'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setImageAtleta(response.data.response.url)
      console.log(response.data.response.url)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Digite o nome do atleta"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={buscarAtletas} className="bg-blue-500 text-white p-2 rounded">
        Buscar
      </button>

      <button onClick={buscarImagens}>Trazer imagem</button>


      {
        // renderização da imagem para debug e teste
        imageAtleta != "" ? <img src={imageAtleta} alt="imagem do atleta" /> : <img src="" alt="imagem do atleta" />
      }


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* {resultados.map((item) => (
          <CardAtleta
            id={item.id}
            atleta={item.name}
          // estatisticas={item.statistics[0]}
          // adicionarFavorito={adicionarFavorito}
          />
        ))} */}
      </div>
    </div>
  );
}