# Healthy Wallet

## 📌 Descrição do Projeto
O **Healthy Wallet** é um sistema de controle de contas pessoais desenvolvido com **React** (frontend) e **Node.js/Express + SQLite** (backend).  
O objetivo do projeto é permitir que o usuário registre suas contas pagas e pendentes, visualize alertas de vencimento, organize prioridades e acompanhe seu saldo financeiro de forma prática e intuitiva.

O projeto foi desenvolvido como um estudo fullstack, simulando um ambiente de desenvolvimento real de empresa, incluindo estrutura de pastas organizada, rotas, componentes e versionamento via Git.

---

## ⚙️ Funcionalidades
- Adicionar contas com nome, valor, data de vencimento e status (paga/pendente).  
- Visualizar contas em tabela com cores:  
  - **Verde** → paga  
  - **Vermelho** → pendente  
  - **Laranja** → vencendo em até 3 dias  
- Ordenação automática: contas pendentes aparecem no topo.  
- Notificações do navegador 7, 3 e 1 dia antes do vencimento.  
- Dashboard com resumo financeiro: total pago, pendente e saldo.  
- Estrutura de rotas para múltiplas páginas usando **React Router v7**.  
- Layout responsivo com **Tailwind CSS**.

---

---

## 🚀 Tecnologias
- **Frontend:** React, Tailwind CSS, React Router v7  
- **Backend:** Node.js, Express  
- **Banco de Dados:** SQLite (ou Prisma como ORM)  
- **Extras:** Notification API do navegador

---

## 🖌 Paleta de cores 
- 1: #ffc52c
- 2: #0a0310
- 3: #04BF8A
- 4: #fb0c06
