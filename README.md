# Sistema de Registro de Ponto via WhatsApp

## 📱 Sobre o Projeto
Sistema automatizado para registro de ponto de funcionários utilizando o WhatsApp como interface. Os funcionários podem registrar sua localização e horário de trabalho através de comandos simples no WhatsApp.

## 🚀 Funcionalidades
- Registro de ponto através do WhatsApp
- Verificação de localização do funcionário
- Armazenamento de dados em PostgreSQL
- Interface simples e intuitiva via WhatsApp

## 📋 Pré-requisitos
- Node.js
- PostgreSQL
- WhatsApp instalado no celular

## 🔧 Instalação

1. Clone o repositório
```bash
git clone [url-do-seu-repositorio]
```

2. Instale as dependências
```bash
npm install
```

3. Configure o arquivo .env
```env
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/nome_do_banco"
```

4. Execute as migrações do Prisma
```bash
npx prisma generate
npx prisma db push
```

5. Inicie o projeto
```bash
npm start
```

## 📱 Como Usar

### Comandos Disponíveis
- `!registro` - Inicia o processo de registro de ponto
- `!ajuda` - Exibe a lista de comandos disponíveis

### Processo de Registro
1. Envie `!registro` no WhatsApp
2. O sistema solicitará sua localização atual
3. Envie sua localização
4. Aguarde a confirmação do registro

## 🛠️ Construído com
- [Node.js](https://nodejs.org/)
- [WhatsApp Web JS](https://wwebjs.dev/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## 📄 Estrutura do Banco de Dados

### Tabela User
- id: Identificador único
- name: Nome do usuário
- phone: Número do WhatsApp
- admin: Status de administrador
- latitude: Localização (latitude)
- longitude: Localização (longitude)
- createdAt: Data de criação
- updatedAt: Data de atualização

### Tabela Message
- id: Identificador único
- content: Conteúdo da mensagem
- from: Remetente
- timestamp: Data e hora do envio

## ⚠️ Observações Importantes
- Mantenha seu WhatsApp conectado para o funcionamento do sistema
- Certifique-se de permitir o acesso à localização quando solicitado
- O sistema requer uma conexão estável com a internet

## 🤝 Contribuindo
Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte
Em caso de dúvidas ou problemas, entre em contato através de [seu-email@exemplo.com] 