# 📖 BASE DE CONHECIMENTO

<p style="text-align: justify">Uma ferramenta criada para compartilhar passo-a-passos de procedimentos, uteís para compartilhar conhecimento entre integrantes de uma equipe, na qual geralmente é necessário treinar novos integrantes explicando todos os procedimentos 🥸.</p>
<br />
<img src="https://i.imgur.com/WzgOVP4.png" alt="knowledge-db" />

## 🤖 CLONANDO O PROJETO

<p>No terminal, digite os comandos para clonar e instalar as dependencias do projeto:</p>
<pre>
C:\> git clone https://github.com-dev-muca/knowledge-database
C:\> cd knowledge-database
C:\> npm i
</pre>

## ⚙️ CONFIGURANDO O PROJETO

<p>Para que a aplicação venha de fato a funcionar será necessário configurar 2 items essenciais no servidor em que elá ficará hospedada, são eles:</p>
<ul>
    <li>Serviço Web</li>
    <li>Banco de Dados (MySQL)</li>
</ul>
<p>Após configurar esses, será necessário configurar algumas váriaveis de ambiente que a aplicação consome para realizar as consultas no banco, seguem elas:</p>
<pre ="javascript">
MYSQL_HOST = IP_BANCO_AQUI
MYSQL_DB   = knowledge
MYSQL_USER = USUARIO_AQUI
MYSQL_PASS = SENHA_AQUI
</pre>

<p>Agora, é necessário criar o banco de dados, para isso, execute os scripts SQL no arquivo knowledge.sql dentro da pasta SQL.</p>
<pre>> SQL/knowledge.sql</pre>

## 🔥 EXECUTANDO O PROJETO

<p>Após realizadas todas as configurações, para executar o projeto, podemos seguir os seguintes passos</p>

<li>Developer:</li>
<p>Com o terminal aberto no mesmo diretorio do projeto, execute:</p>
<pre>
C:\knowledge-database> npm run dev
</pre>

<li>Build:</li>
<p>Com o terminal aberto no mesmo diretorio do projeto, execute:</p>
<pre>
C:\knowledge-database> npm run build
C:\knowledge-database> npm run start
</pre>

Após execução do modo build/developer, basta acessar <a target="_blank" href="http://localhost:3000" style="color: lightblue; font-weight: bold">http://localhost:3000</a> e o projeto estará no ar.

## 🚀 DEPLOY

<p>Se preferir ou não quiser ter todo o trabalho de configurar o projeto, você pode acessar uma versão minificada do projeto através <a target="_blank" href="https://knowledge-dtb.vercel.app" style="color: lightblue; font-weight: bold" >deste link clicando aqui!</a></p>

<br />
Obrigado 😄😁
