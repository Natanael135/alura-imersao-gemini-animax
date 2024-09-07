export const dadosPromise = fetch('./dados/dados.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(jsonData => jsonData) // Retorna os dados carregados
  .catch(error => {
    console.error('Houve um problema com a requisição:', error)
  })
