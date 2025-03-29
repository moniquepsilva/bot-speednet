const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const client = new Client({
    authStrategy: new LocalAuth()
});

// Objeto para guardar os estados dos usuários
const userStates = {};

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');
});

client.on('message', async (message) => {
    
    const from = message.from; // número do usuário
    
    // Se o usuário está em algum processo de registro
    if (userStates[from]) {
        switch (userStates[from].step) {
            case 'AGUARDANDO_LOCALIZACAO':
                if (message.type === 'location') {
                    // Salva a localização no banco de dados
                    try {
                        await prisma.user.update({
                            where: { phone: from },
                            data: {
                                latitude: message.location.latitude,
                                longitude: message.location.longitude
                            }
                        });
                        message.reply('Localização registrada com sucesso! Registro completo.');
                        delete userStates[from]; // limpa o estado do usuário
                    } catch (error) {
                        message.reply('Erro ao salvar localização. Tente novamente.');
                    }
                } else {
                    message.reply('Por favor, envie sua localização atual.');
                }
                break;

            case 'AGUARDANDO_NOME':
                const name = message.body;
                await prisma.user.create({
                    data: {
                        name: name,
                        phone: from
                    }
                });
                message.reply('Registro completo! Bem vindo ao sistema '+name);
                delete userStates[from]; // limpa o estado do usuário
                break
        }
        return;
    }

    // Comandos disponíveis
    if (message.body.startsWith('!')) {
        const command = message.body.toLowerCase();
        const user = await prisma.user.findUnique({
            where: { phone: from }
        });
        if (!user && command !== '!registro') {
            message.reply('Você não está registrado no sistema. Digite !registro para se registrar.');
            return;
        }
        
        switch (command) {
            case '!ponto':
                // Inicia o processo de registro de um ponto
                userStates[from] = {
                    step: 'AGUARDANDO_LOCALIZACAO'
                };
                message.reply('Por favor, envie sua localização atual.');
                break;
            
            case '!registro':
                if (user) {
                    message.reply('Você já está registrado no sistema. Digite !ponto para registrar um ponto.');
                    return;
                }
                // Inicia o processo de registro de um novo usuário
                userStates[from] = {
                    step: 'AGUARDANDO_NOME'
                };
                message.reply('Por favor, envie seu nome completo.');
                break;
                
            case '!ajuda':
                message.reply(`Comandos disponíveis:
                    !registro - Iniciar processo de registro
                    !ajuda - Mostrar esta mensagem`);
                break;

            default:
                message.reply('Comando não reconhecido. Digite !ajuda para ver os comandos disponíveis.');
                break;
        }
    }
});

client.initialize(); 
console.log('Cliente WhatsApp está pronto!');