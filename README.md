# 📞 Sistema de Atendimento em Tempo Real

Este projeto é um sistema simples de gerenciamento de filas de atendimento em tempo real, ideal para postos de saúde, clínicas ou serviços de atendimento ao público.

A aplicação permite que atendentes cadastrem usuários com nome e CPF, e os organizem em uma fila, atualizando os status de atendimento. Através de um painel próprio, os usuários podem saber quando estão sendo chamados.

## 🚀 Tecnologias Utilizadas

- ⚛️ React (Vite)
- 📦 WebSocket
- 🔙 Node.js

---

## 🖥️ Telas

### 👨‍⚕️ Painel do Atendente
- Cadastra usuários com Nome e CPF (CPF precisa ter 11 dígitos).
- Visualiza a fila em tempo real.
- Chama usuários e atualiza status para "em atendimento" ou "atendido".
- Remove usuários da fila, se necessário.

### 👥 Painel do Usuário
- Visualiza a fila atual em tempo real.
- Acompanhe se seu nome já foi chamado.


## ⚙️ Como Executar o Projeto

### 🔧 Pré-requisitos
- Node.js 18 ou superior
- npm

### 1. Clone o projeto:
```
git clone https://github.com/henriqmguima/atendimento-websocket-react-app.git
```
### 2. Instalar node e bibliotecas
```
cd atendimento-websocket-react-app
```
```
npm install
```
```
cd servidor
```
```
npm install ws
```
```

### 3. Execute o servidor e o cliente

1. Abra dois terminais
2. No primeiro, vá até o servidor do projeto
```
cd atendimento-websocket-react-app/servidor
```
3. Execute o servidor
```
npm run dev
```
Servidor será executado em: `http://localhost:8080`

4. No outro terminal, vá até a raiz do projeto e execute a aplicação
```
cd atendimento-websocket-react-app
```
```
npm run dev
```
Aplicação estará disponível em: `http://localhost:5173`

5. A aplicação deve ser aberta em duas abas, uma para rodar o painel de atendente, e outra para visualizar o usuário
