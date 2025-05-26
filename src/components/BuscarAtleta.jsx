import React, { useEffect, useState } from "react"
import axios from "axios"
import CardAtleta from "./CardAtleta.jsx"

export default function PesquisaAtleta(props) {
  // Pegar ou atualiza o valor digitado no input de texto
  const [nomeDigitado, setnomeDigitado] = useState("")
  // Serve para disparar o useEffect para realizar as requisições a API, é primeiramente passado o valor de "nomeDigitado" quando o usuário clica no botão de busca
  const [nomeValor, setNomeValor] = useState(null)
  // Um array para armazernar todos os jogadores encontrados.
  const [dadosAtletas, setDadosAtletas] = useState([])
  // É usado para mostar a mensagem "Carregando" enquanto a API está buscando os dados
  const [carregando, setCarregando] = useState(false)
  // Serve para armazernar e mostrar alguem erro que pode ocorrer ao fazer requisições a API
  const [erro, setErro] = useState(null)

  // Observa a mudança de valor na variavel "nomeValor"
  useEffect(() => {
    // Caso o valor seja "null", não executa
    if (!nomeValor) return

    // função assincrona para uma realização mais rápida das requisições
    async function buscarDados() {
      // Tente para ver se funciona
      try {
        // Constantes definidas em seus valores nulos para evitar erros
        setCarregando(true)
        setErro(null)
        setDadosAtletas([])

        // Usando as variaveis de ambiente para obter os valores das URLs, chave da API e Host
        const name_host = import.meta.env.VITE_API_NAME_HOST
        const host = import.meta.env.VITE_API_HOST
        const name_key = import.meta.env.VITE_API_NAME_KEY
        const key = import.meta.env.VITE_API_KEY
        const url_1 = import.meta.env.VITE_API_URL_01
        const url_2 = import.meta.env.VITE_API_URL_02
        const url_3 = import.meta.env.VITE_API_URL_03

        // Constante que armazerna o Header do enpointer
        const headers = {
          [name_host]: host,
          [name_key]: key
        }

        // Serve para buscar todos os jogadores por nome. 
        const options1 = {
          method: "GET",
          url: url_1,
          params: { search: nomeValor },
          headers,
        }

        // Objeto retornado do Axios, após a requisição a API
        const response = await axios.request(options1)
        // Contém a parte da resposta da API que possue a lita de jogadores
        const atletasBase = response.data.response.suggestions

        // Verifica se a lista está vazia
        if (!atletasBase) {
          setErro("Atleta(s) não encontrado(s).")
          return
        }

        // Retorna um array que amazena todos os objetos "atletas" populados com as requisições feitas. Cada jogador necessita de duas requisições: uma para imagem e outra para os detalhes. Usando o Promise.ALL podemos executar essa tarefa paralelamente, reduzindo o tempo de busca 
        const listaAtletas = await Promise.all(
          // Aqui limitamos a busca até 3 jogadores, por conta do limite de 100 requisições por mês que o plano grátis da API usada fornence. Se fosse ilimitado não haveria necessidade de "slice(0,3)"
          atletasBase.slice(0, 3).map(async (atletaItem) => {
            // Extraindo as informações com base no Json da resposta da API
            const id = atletaItem.id;
            const nome = atletaItem.name;
            const nomeTime = atletaItem.teamName;

            // Este endpoint retorna a imagem do jogador
            const options2 = {
              method: "GET",
              url: url_2,
              params: { playerid: id },
              headers,
            };

            // Este endpoint retorna os detalhes do jogador
            const options3 = {
              method: "GET",
              url: url_3,
              params: { playerid: id },
              headers,
            };

            // Realiza a busca pela imagem e pelos detalhes do jogador. utiliza mais um promisse.all para que as requições ocorram em paralelo e tornando o processo mais rápido
            const [resImagem, resAtributos] = await Promise.all([
              axios.request(options2),
              axios.request(options3),
            ]);

            // Montando o objeto "atleta", extraindo as informações com base no Json das repostas de cada endpoint. Caso alguma inoformação seja "null" ou "undefild" é colocado o "-" para evitar que o jogador seja evitado completamente.
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

            // Retorna o objeto atleta 
            return atleta;
          })
        );

        // Atribuir o valor da lista ao array de jogadores/atletas
        setDadosAtletas(listaAtletas);
        // Caso ocorra um erro, o valor é amazenado na constante "erro"
      } catch (err) {
        // mostrar no console o erro
        console.error(err)
        setErro("Erro ao buscar dados do atleta.")
        // Independente se tudo ocorrer bem ou não, é atribuido o valor false a constante carregando, para assim mostrar os jogadores da busca ou imprimir o erro 
      } finally {
        setCarregando(false);
      }
    }

    // chama a função buscarDadados para executar as requisições
    buscarDados()
    // Muda o nomeValor para "null" para evitar bugs
    setNomeValor(null)
  }, [nomeValor])


  // Observa "nomeDigitado" para que quando modificar o seu valor, possa limpar os jogadores buscados da tela
  useEffect(() => {
    setDadosAtletas([])
  }, [nomeDigitado])

  return (
    <div>
      { /* Sessão do formulario de pesquisa */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Pesquisar Atletas</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite o nome do atleta"
            className="w-full border border-gray-300 rounded-lg p-2 text-base"
            value={nomeDigitado}
            onChange={(e) => setnomeDigitado(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={!nomeDigitado.trim()}
            onClick={() => setNomeValor(nomeDigitado)}
          >
            Buscar
          </button>
        </div>
      </div>

      { /* Sessão dos cards dos jogadores */}
      <div className="m-6">
        {carregando && <p className="text-blue-500">Carregando...</p>}
        {erro && <p className="text-red-500">{erro}</p>}
        {dadosAtletas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dadosAtletas.map((atleta) => (
              <CardAtleta
                key={atleta.id}
                atleta={atleta}
                adicionarFavorito={props.adicionarFavorito}
                botaofav={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
