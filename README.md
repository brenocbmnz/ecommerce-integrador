🛍️ ShopSphere - E-commerce com React & Node.js📄 DescriçãoShopSphere é uma aplicação full-stack de e-commerce construída do zero, utilizando o MERN stack (MongoDB, Express, React, Node.js). O projeto simula uma loja virtual completa, desde a vitrine de produtos para clientes até um painel de administrador para gerenciamento de inventário e usuários.Este projeto foi desenvolvido como um sistema completo, demonstrando a integração entre um frontend reativo e um backend robusto com API RESTful.✨ FuncionalidadesNavegação de Usuário: Vitrine de produtos, página de detalhes, filtragem de produtos por categoria.Carrinho de Compras: Adicionar, remover e atualizar quantidade de itens, com persistência no navegador (localStorage).Sistema de Checkout: Fluxo de compra completo, com validação de estoque em tempo real e criação de pedidos no banco de dados.Autenticação de Usuários: Sistema de Login e Cadastro, com diferenciação de permissões (usuário comum vs. administrador).Gerenciamento de Sessão: O usuário permanece logado mesmo após atualizar a página (persistência com JWT).Painel de Administrador Protegido: Área acessível apenas para usuários com a permissão de 'admin'.CRUD de Produtos: Administradores podem Criar, Ler, Atualizar e Deletar produtos, incluindo o gerenciamento de estoque.🛠️ Tecnologias UtilizadasFrontend:React: Biblioteca para a construção da interface de usuário.Tailwind CSS: Framework de CSS para estilização rápida e responsiva.Backend:Node.js: Ambiente de execução para o JavaScript no servidor.Express: Framework para a construção da API RESTful.MongoDB: Banco de dados NoSQL para armazenar produtos, usuários e pedidos.Mongoose: ODM para modelar e interagir com o MongoDB.JWT (JSON Web Tokens): Para autenticação e gerenciamento de sessão.bcryptjs: Para criptografia de senhas.dotenv: Para gerenciar variáveis de ambiente.🚀 Como Executar o ProjetoPara executar este projeto localmente, você precisará de dois terminais: um para o backend (servidor) e outro para o frontend (cliente).Pré-requisitosNode.js (versão 14 ou superior)npm ou yarnUma conta no MongoDB Atlas (o plano gratuito é suficiente)1. Configurando o Backend (Servidor)# Clone o repositório
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

# Navegue até a pasta do servidor
cd seu-repositorio/server

# Instale as dependências
npm install

# Crie um arquivo .env na pasta 'server' e adicione sua string de conexão do MongoDB Atlas
# e um segredo para o JWT
MONGO_URI=mongodb+srv://<seu_usuario>:<sua_senha>@cluster...
JWT_SECRET=seu_segredo_super_secreto_aqui
Depois de configurar o .env, você pode iniciar o servidor:# Inicie o servidor backend
node server.js

# O servidor estará rodando em http://localhost:5001

# IMPORTANTE: Popule o banco de dados pela primeira vez
# Abra seu navegador e acesse http://localhost:5001/api/seed
