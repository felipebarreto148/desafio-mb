<div align="center">

  <img 
    height="180"
    src="https://static.mercadobitcoin.com.br/web/img/logos/mb/logo-icon-color.svg"
  />

  <h1>Desafio MB Web</h1>

  <p>Seja bem-vindo ao desafio do mercado bitcoin.</p>

  <section>
  <!-- Node -->
  <img src="https://img.shields.io/static/v1?label=NODE&message=18.12.0&color=ef4723&style=for-the-badge&logo=nodedotjs"/>
  <img src="https://img.shields.io/static/v1?label=NPM&message=10.5.2&color=ef4723&style=for-the-badge&logo=npm"/>
  <img src="https://img.shields.io/static/v1?label=LICENSE&message=MIT&color=ef4723&style=for-the-badge"/>
  </section>

</div>

<h2>Pré Requisitos</h2>
<p>
  Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
  <a href="https://www.docker.com/" target="_blank">Docker</a> e <a href="https://nodejs.org/pt/" target="_blank">Node.js</a>.
</p>

<h2>🛠 Tecnologias</h2>
<section>
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="badge Vue JS">
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="badge Vue JS">
	<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="badge Javascript">
	<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="badge Sass">
  <img src="https://img.shields.io/static/v1?label=Express&message=Backend&color=ef4723&style=for-the-badge&logo=express"/>
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
</section>

<h2>Como Rodar?</h2>
<h3>Docker Compose</h3>

```bash
# Clone o repositório.
git clone https://github.com/felipebarreto148/desafio-mb.git

# Rode o projeto.
docker-compose up

# Acesse a aplicação em seu navegador
http://localhost:8000
```

<h3>Rodando os projetos separadamente</h3>

```bash
# Clone o repositório.
git clone https://github.com/felipebarreto148/desafio-mb.git

# Acesse o frontend
cd desafio-mb-front

# Instale as dependências do front
yarn install
ou
npm install

# Rode o frontend
yarn dev
ou 
npm run dev

# Abra um novo terminal e acesse o backend
cd desafio-mb-back

# Instale as dependências
npm install

# Execute o backend
npm run start

# Acesse a aplicação em seu navegador
http://localhost:8000
```
