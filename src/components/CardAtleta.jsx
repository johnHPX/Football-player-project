import React from "react";

export default function CardAtleta({ atleta }) {
  return (
    <div className="border rounded p-4 shadow">
      <img src={atleta.img} alt={atleta.nome} className="w-24 h-24 object-cover rounded-full mb-2" />
      <h2 className="text-xl font-bold">{atleta.nome}</h2>
      <p>Idade: {atleta.idade}</p>
      <p>Altura: {atleta.altura}</p>
      <p>Camisa: {atleta.camisa}</p>
      <p>Pés preferidos: {atleta.pesPreferidos}</p>
      <p>País: {atleta.pais}</p>
      <p>Valor de mercado: {atleta.valorMercado}</p>
      <p>Time: {atleta.nomeTime}</p>
      <button onClick={() => adicionarFavorito(atleta)} className="mt-2 bg-green-500 text-white p-2 rounded">
        Adicionar aos favoritos
      </button>
    </div>
  );
}