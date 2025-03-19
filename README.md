# Raspawards API

API RESTful para consultar os produtores com menor e maior intervalo de vitórias na categoria Pior Filme do Golden Raspberry Awards.

## Tecnologias utilizadas
- Node.js
- Express
- SQLite (banco em memória)
- csv-parser
- Jest + Supertest (testes de integração)

## Como rodar o projeto
```bash
npm install
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

## Endpoint disponível
- `GET /api/producers/intervals`

Resposta:
```json
{
  "min": [
    {
      "producer": "Nome",
      "interval": 1,
      "previousWin": 2000,
      "followingWin": 2001
    }
  ],
  "max": [
    {
      "producer": "Outro Nome",
      "interval": 13,
      "previousWin": 1990,
      "followingWin": 2003
    }
  ]
}
```

## Rodando os testes de integração
```bash
npm test
```

Os testes utilizam o Jest + Supertest e verificam se o retorno da API segue o formato esperado.
