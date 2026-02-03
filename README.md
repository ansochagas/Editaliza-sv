# Editaliza

Sistema backend desenvolvido para apoio à organização e planejamento de estudos, permitindo o controle de conteúdos, cronogramas e progresso do usuário de forma estruturada.

O projeto foi criado com foco em **organização de regras de negócio, clareza de arquitetura e manutenibilidade**, simulando um cenário real de aplicação backend.

---

##  Visão Geral

O Editaliza é uma aplicação responsável por:
- Gerenciar dados relacionados a planejamento de estudos
- Organizar informações por disciplinas, conteúdos e períodos
- Aplicar regras de negócio para controle de progresso
- Expor funcionalidades através de uma API

O objetivo principal do projeto é demonstrar **capacidade de modelagem de domínio, organização de código e desenvolvimento de sistemas backend**.

---

##  Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **APIs REST**
- **Git / GitHub**
- Banco de dados relacional
- Estrutura preparada para testes automatizados

---

##  Estrutura do Projeto

```txt
Editaliza-sv/
├── src/
│   ├── controllers/     # Camada de controle (requisições HTTP)
│   ├── services/        # Regras de negócio
│   ├── repositories/   # Acesso a dados
│   ├── routes/          # Definição das rotas da API
│   ├── models/          # Modelos de domínio
│   └── utils/           # Funções auxiliares
├── tests/               # Testes automatizados
├── .env.example         # Exemplo de variáveis de ambiente
├── package.json
└── README.md
