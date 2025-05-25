import React from "react";

export default function CardAtleta(props) {
  return (
    <div className="border rounded p-4 shadow">
      <img src={props.atleta.img} alt={props.atleta.nome} className="w-24 h-24 object-cover rounded-full mb-2" />
      <h2 className="text-xl font-bold">{props.atleta.nome}</h2>
      <p>Idade: {props.atleta.idade}</p>
      <p>Altura: {props.atleta.altura}</p>
      <p>Camisa: {props.atleta.camisa}</p>
      <p>Pés preferidos: {props.atleta.pesPreferidos}</p>
      <p>País: {props.atleta.pais}</p>
      <p>Valor de mercado: {props.atleta.valorMercado}</p>
      <p>Time: {props.atleta.nomeTime}</p>
      <button onClick={() => {
        props.adicionarFavorito(props.atleta)
        props.setDadosAtleta(null)
      }} className="mt-2 bg-green-500 text-white p-2 rounded">
        Adicionar aos favoritos
      </button>
    </div>
  );
}