#!/bin/bash  
  
# Nome da imagem  
IMAGE_NAME="lorthe/discord-mongadj"  
  
# Verifica se o usuário está logado no Docker  
if ! docker info >/dev/null 2>&1; then  
    echo "Você não está logado no Docker. Realizando login..."  
    docker login  
    if [ $? -ne 0 ]; then  
        echo "Falha no login do Docker."  
        exit 1  
    fi  
fi  
  
echo "Iniciando o build da imagem Docker..."  
docker build -t $IMAGE_NAME .  
  
echo "Build concluído. Realizando push da imagem para o Docker Hub..."  
docker push $IMAGE_NAME  
  
if [ $? -eq 0 ]; then  
    echo "Push realizado com sucesso."  
else  
    echo "Falha ao realizar o push da imagem."  
    exit 1  
fi  
  
echo "Deploy completo."  