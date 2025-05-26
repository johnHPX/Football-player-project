import React, { useState } from "react";
import BuscarAtleta from "./components/BuscarAtleta"
import PainelFavoritos from "./components/PainelFavoritos"

import './App.css'

export default function App() {
  // Array que conterá os jogadores favoritados
  const [favoritos, setFavoritos] = useState([]);

  // Função que adiciona um jogadores no array
  const adicionarFavorito = (atleta) => {
    if (!favoritos.find((f) => f.id === atleta.id)) {
      setFavoritos([...favoritos, atleta]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Coluna principal de busca */}
      <div className="flex-grow p-6">
        <BuscarAtleta adicionarFavorito={adicionarFavorito} />
      </div>

      {/* Painel lateral de favoritos */}
      <div className="w-[300px] bg-white border-l border-gray-300 p-6 min-h-screen">
        <PainelFavoritos favoritos={favoritos} />
      </div>
    </div>
  );
}
