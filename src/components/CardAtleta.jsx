import React from "react";

export default function CardAtleta({ id, atleta, estatisticas, adicionarFavorito }) {
  return (
    <div className="border rounded p-4 shadow">
      <img src={atleta.photo} alt={atleta.name} className="w-24 h-24 object-cover rounded-full mb-2" />
      <h2 className="text-xl font-bold">{atleta.name}</h2>
      <p>Idade: {atleta.age}</p>
      <p>Time: {estatisticas.team.name}</p>
      <button
        onClick={() => adicionarFavorito(atleta)}
        className="mt-2 bg-green-500 text-white p-2 rounded"
      >
        Adicionar aos favoritos
      </button>
    </div>
  );
}