# Roadlab 

Plataforma para monitoramento e gestão da refletância de placas usando inteligência artificial.


## ⚙️ Requirementos para funcionar

- 🐋 Docker
- 🟢 Node
- 📦 Yarn

## 🚀 Como rodar o projeto

- Clone esse projeto.
- Certifique-se de que o Docker está funcionando corretamente
- Use o comando `yarn install` no terminal, isso fará com que a imagem Docker suba e as dependências sejam instaladas.
- Use o comando `yarn dev` para rodar o projeto em ambiente de desenvolvimento.

<p>Para acessar o backend, acesse <i>http://localhost:3001</i></p>
<p>Para acessar o frontend, acesse <i>http://localhost:3000</i></p>
<p>Para acessar a API integrada com whatsapp, acesse <i>http://localhost:3002</i></p>

## 🌱 Rotas Backend

- GET: /issues -> Retorna uma lista com todas as placas com problemas.
- POST: /issues/call/{{work_id}}/{{team_id}} -> Envia uma mensagem no WhatsApp com uma nova ocorrência.
- POST: /team/register -> Registra um time para receber os alertas.
- GET: /team/all -> Retornas os times existentes que podem receber os alertas.
- POST: /sign/{{sign_id}} -> Cadastra uma nova placa no sistema ou atualiza uma existente.