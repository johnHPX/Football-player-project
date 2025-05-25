import React, { useEffect, useState } from "react";
import axios from "axios";
import CardAtleta from "./CardAtleta.jsx";

export default function PesquisaAtleta() {
  const [nomeInput, setNomeInput] = useState("");
  const [nomeValue, setNomeValue] = useState(null);
  const [dadosAtleta, setDadosAtleta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!nomeValue) return;

    async function buscarDados() {
      try {
        setLoading(true);
        setErro(null);
        setDadosAtleta(null);

        const headers = {
          "x-rapidapi-key": "449e971e0amsh24681866c5fc23bp1a6079jsn19d2019d0380",
          "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
        };

        const options1 = {
          method: "GET",
          url: "https://free-api-live-football-data.p.rapidapi.com/football-players-search",
          params: { search: nomeValue },
          headers,
        };

        const response = await axios.request(options1);
        const atletaBase = response.data.response.suggestions[0];

        if (!atletaBase) {
          setErro("Atleta não encontrado.");
          return;
        }

        const { id, name: nome, teamName: nomeTime } = atletaBase;

        const options2 = {
          method: "GET",
          url: "https://free-api-live-football-data.p.rapidapi.com/football-get-player-logo",
          params: { playerid: id },
          headers,
        };

        const options3 = {
          method: "GET",
          url: "https://free-api-live-football-data.p.rapidapi.com/football-get-player-detail",
          params: { playerid: id },
          headers,
        };

        const [resImagem, resAtributos] = await Promise.all([
          axios.request(options2),
          axios.request(options3),
        ]);

        const atleta = {
          id,
          nome,
          nomeTime,
          img: resImagem.data.response?.url ?? "-",
          altura: resAtributos.data.response?.detail?.[0]?.value?.numberValue ?? "-",
          camisa: resAtributos.data.response?.detail?.[1]?.value?.numberValue ?? "-",
          idade: resAtributos.data.response?.detail?.[2]?.value?.numberValue ?? "-",
          pesPreferidos: resAtributos.data.response?.detail?.[3]?.value?.key ?? "-",
          pais: resAtributos.data.response?.detail?.[4]?.value?.fallback ?? "-",
          valorMercado: resAtributos.data.response?.detail?.[5]?.value?.numberValue ?? "-",
        };

        setDadosAtleta(atleta);
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar dados do atleta.");
      } finally {
        setLoading(false);
      }
    }

    setNomeInput("")

    buscarDados();
  }, [nomeValue]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Digite o nome do atleta"
        className="border p-2 mr-2"
        value={nomeInput}
        onChange={(e) => setNomeInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        disabled={!nomeInput.trim()}
        onClick={() => setNomeValue(nomeInput)}
      >
        Buscar
      </button>

      <div className="mt-4">
        {loading && <p className="text-blue-500">Carregando...</p>}
        {erro && <p className="text-red-500">{erro}</p>}
        {dadosAtleta && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardAtleta atleta={dadosAtleta} />
          </div>
        )}
      </div>
    </div>
  );
}
