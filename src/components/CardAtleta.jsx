import React from "react";

export default function CardAtleta(props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center">
      <img
        src={props.atleta.img}
        alt={props.atleta.nome}
        className="w-full h-auto object-cover rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2">{props.atleta.nome}</h2>
      <p><strong>Idade:</strong> {props.atleta.idade}</p>
      <p><strong>Altura:</strong> {props.atleta.altura}</p>
      <p><strong>Camisa:</strong> {props.atleta.camisa}</p>
      <p><strong>Pés preferidos:</strong> {props.atleta.pesPreferidos}</p>
      <p><strong>País:</strong> {props.atleta.pais}</p>
      <p><strong>Valor de mercado:</strong> {props.atleta.valorMercado}</p>
      <p><strong>Time:</strong> {props.atleta.nomeTime}</p>

      {props.botaofav && (
        <button
          onClick={() => {
            props.adicionarFavorito(props.atleta)
          }}
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Adicionar aos favoritos
        </button>
      )}

    </div>
  );
}