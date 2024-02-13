# WebPolls

Este projeto é um frontend desenvolvido com Nuxt para o projeto da trilha Node.js [Polls](https://github.com/castelogui/polls).
Antes de testar este projeto é preciso ter o backend [Polls](https://github.com/castelogui/polls) rodando localmente na posta 3333.

![Apresentação](https://github.com/castelogui/webpolls/blob/main/public/exemple.gif)

## Funcionalidade

O projeto tem a funcionalidade de criar enquetes e compartilha-las para obter votos.
Com a função do websocket podemos obter a contagem de votos automaticamente na listagem das enquetes.

Para criar uma enquete basta adicionar um título e as opções separadas por "*;*" (ponto e vírgula), é possível editar a enquete, podendo adicionar novas opções apenas adicionando o "*;*" ou remover a opção apenas apagando o campo.

Para obter os votos basta compartilhar o link da enquete.

## Setup

Instale as dependências utilizando:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Inicie o servidor de desenvolvimento em `http://localhost:3000` com o seguinte comando:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
