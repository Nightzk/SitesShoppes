require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Gerencianet } = require('gn-api-sdk-node'); // SDK Gerencianet

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Servir arquivos estáticos

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para gerar pagamento via Pix
app.post('/pay', async (req, res) => {
    const { plan, price } = req.body;

    try {
        const options = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            sandbox: true // Defina como 'false' para produção
        };

        const gerencianet = new Gerencianet(options);

        const data = {
            calendario: { expiracao: 3600 }, // Expiração de 1 hora
            valor: { original: price.toFixed(2) },
            chave: process.env.PIX_KEY, // Sua chave Pix
            solicitacaoPagador: `Pagamento do plano ${plan}`
        };

        const response = await gerencianet.pixCreateImmediateCharge([], data);
        const qrCode = response.loc.qrcode;

        res.status(200).json({
            message: 'Pagamento criado com sucesso',
            qrCode,
            location: response.loc.location
        });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Erro ao processar pagamento' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
