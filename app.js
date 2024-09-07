import { dadosPromise } from './dados/dados.js'

function buscar() {
  const section = document.getElementById('resultados-pesquisa')
  const campoPesquisa = document
    .getElementById('campo-pesquisa')
    .value.trim()
    .toLowerCase()

  if (!campoPesquisa) {
    section.innerHTML =
      '<p>Campo de pesquisa vazio, Nenhum resultado encontrado!</p>'
    return
  }

  dadosPromise
    .then(dados => {
      if (!dados) {
        section.innerHTML = 'Os dados não estão disponíveis no momento.'
        return
      }

      const resultados = dados
        .filter(
          dado =>
            dado.Titulo.toLowerCase().includes(campoPesquisa) ||
            dado.Genero.toLowerCase().includes(campoPesquisa)
        )
        .map(
          dado => `
        <div class="item-resultado">
          <h2><a href="${dado.link}" target="_blank">${dado.Titulo}</a></h2>
          <p><strong>Gênero:</strong> ${dado.Genero}</p>
          <p><strong>Ano de Lançamento:</strong> ${dado.AnoLancamento}</p>
          <p class="descricao-meta">${dado.Sinopse}</p>
          <a href="${dado.link}" target="_blank">Saiba Mais</a>
        </div>
      `
        )
        .join('')

      section.innerHTML = resultados || 'Nenhum resultado encontrado.'
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error)
      section.innerHTML = 'Houve um problema ao carregar os dados.'
    })
}

// Torna a função 'buscar' acessível globalmente
window.buscar = buscar
