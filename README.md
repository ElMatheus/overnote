# 📒 Plataforma de Anotações

Uma plataforma moderna e intuitiva para criar, organizar e compartilhar anotações de forma eficiente.

## 🎯 Funcionalidades Principais

- **Criação de Anotações**: Adicione títulos e conteúdos personalizados para suas notas.
- **Edição Avançada**: Utilize o editor Rich Text WYSIWYG para formatar suas anotações.
- **Dashboard**: Acesso rápido às anotações mais recentes e opção de criar uma nova nota rapidamente.
- **Gerenciamento de Notas**: Visualize todas as suas anotações e as compartilhadas com você, podendo pesquisar e filtrar conforme necessário.
- **Configurações Avançadas**: Defina a privacidade de suas notas e compartilhe com outros usuários.
- **Salvamento Automático**: Suas anotações são salvas automaticamente à medida que você as escreve.

## 📂 Estrutura das Páginas

### 1️⃣ **Dashboard**
- Exibe as anotações mais recentes.
- Seção de criação rápida para adicionar novas anotações com um único clique.

### 2️⃣ **Página de Notas**
- Lista todas as notas do usuário e as compartilhadas com ele.
- Possibilidade de pesquisa e filtros para facilitar a organização.

### 3️⃣ **Edição de Nota**
- Permite modificar o título e o conteúdo da anotação.
- Editor Rich Text para formatação avançada.

### 4️⃣ **Configurações da Nota**
- Defina a privacidade da anotação (pública ou privada).
- Escolha com quem deseja compartilhar a anotação.

## 🚀 Tecnologias Utilizadas

- **Front-end**: Next.js, React, Tailwind CSS, TipTap (Editor Rich Text)
- **Back-end**: Node.js
- **Autenticação**: NextAuth
- **Banco de Dados**: PostgreSQL

## 🛠️ Como Executar o Projeto Localmente

1. **Clone o repositório**
   ```sh
   git clone https://github.com/ElMatheus/overnote.git
   cd overnote
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis:
     ```env
     DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
     NEXTAUTH_SECRET=sua-chave-secreta
     ```

4. **Execute as migrações do banco de dados**
   ```sh
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento**
   ```sh
   npm run dev
   ```

6. **Acesse a aplicação**
   - O projeto estará disponível em `http://localhost:3000`

## 🌐 Acesse a Aplicação

Acesse a aplicação em: [overnote-six.vercel.app](https://overnote-six.vercel.app/dashboard)
