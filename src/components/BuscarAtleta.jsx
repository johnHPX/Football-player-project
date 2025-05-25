import React, { useEffect, useState } from "react";
import axios from "axios";
import CardAtleta from "./CardAtleta.jsx";

export default function PesquisaAtleta(props) {
  const [nomeInput, setNomeInput] = useState("")
  const [nomeValue, setNomeValue] = useState(null)
  const [dadosAtleta, setDadosAtleta] = useState(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    if (!nomeValue) return;

    async function buscarDados() {
      try {
        setLoading(true);
        setErro(null);
        setDadosAtleta(null);

        const name_host = import.meta.env.VITE_API_NAME_HOST
        const host = import.meta.env.VITE_API_HOST
        const name_key = import.meta.env.VITE_API_NAME_KEY
        const key = import.meta.env.VITE_API_KEY
        const url_1 = import.meta.env.VITE_API_URL_01
        const url_2 = import.meta.env.VITE_API_URL_02
        const url_3 = import.meta.env.VITE_API_URL_03

        const headers = {
          [name_host]: host,
          [name_key]: key
        };

        const options1 = {
          method: "GET",
          url: url_1,
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
          url: url_2,
          params: { playerid: id },
          headers,
        };

        const options3 = {
          method: "GET",
          url: url_3,
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

    setNomeValue(null)

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
            <CardAtleta atleta={dadosAtleta} adicionarFavorito={props.adicionarFavorito} setDadosAtleta={setDadosAtleta} />
          </div>
        )}
      </div>
    </div>
  );
}
