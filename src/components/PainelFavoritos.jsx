import React from "react";
import CardAtleta from "./CardAtleta.jsx"

export default function PainelFavoritos({ favoritos }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-semibold mb-4 self-center">Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum favorito adicionado.</p>
      ) : (
        favoritos.map((atleta, index) => (
          <CardAtleta
            key={index}
            atleta={atleta}
            botaofav={false}
          />
        ))
      )}
    </div>
  )
}