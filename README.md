Projeto de extensão Unifor. Sistema que atenderá as necessidades da Escola Biblica Dominical
(EM DESENVOLVIMENTO)

Tecnologias utilizadas: Node.js, MySQL (Sequelize ORM), sistema de autenticação com JWT.

Comandos: npm start --> inicia o servidor na porta 3000.

Endpoints:
Students
• GET /student/ --> retorna todos os alunos cadastrados no banco de dados;

• GET /student/:id --> retorna um aluno específico a partir do seu ID;

• POST /student/create --> cria um novo aluno no banco de dados, respeitando suas respectivas validações;

• DELETE /student/delete/:id --> exclui um aluno do banco de dados, a partir do seu ID;

• PATCH /student/update/:id --> edita um aluno no banco, a partir do seu ID;

• PATCH /presence/:id --> método que concede presença ao aluno;

Teacher // Assumi a entidade Teacher como o usuário principal
• GET /teacher/profile --> retorna o professor atualmente logado no sistema, a partir do Token;

• POST /teacher/register --> registra um professor no banco de dados, e gera seu Token de autenticação;

• POST /teacher/login --> método de login e suas validações, e gera seu token de autenticação;

Classroom
• GET /classrooms/ --> retorna todas as turmas registradas no banco;
