import React from "react";

export default function PainelFavoritos({ favoritos }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Atletas Favoritos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoritos.map((atleta) => (
          <div key={atleta.id} className="border p-4 rounded shadow">
            <img src={atleta.img} alt={atleta.nome} className="w-20 h-20 rounded-full mb-2" />
            <h3 className="text-lg font-semibold">{atleta.nome}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}