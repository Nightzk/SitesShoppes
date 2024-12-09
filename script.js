document.querySelectorAll('.select-plan').forEach(button => {
    button.addEventListener('click', async () => {
        const plan = button.getAttribute('data-plan');
        const price = parseFloat(button.getAttribute('data-price'));

        try {
            const response = await fetch('/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan, price })
            });

            const data = await response.json();
            if (data.qrCode) {
                document.getElementById('qr-code').innerHTML = `
                    <img src="${data.qrCode}" alt="QR Code Pix">
                    <p>Escaneie o QR Code para pagar.</p>
                `;
            } else {
                alert('Erro ao criar pagamento.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro no servidor.');
        }
    });
});
