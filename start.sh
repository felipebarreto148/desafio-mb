#!/bin/bash

# Iniciar o backend
node /desafio-mb-back/index.js &

# Iniciar o frontend
npm run --prefix /desafio-mb-front dev &

# Manter o contêiner rodando
wait -n

# Saída do contêiner
exit $?