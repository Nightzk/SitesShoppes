document.querySelectorAll('.select-plan').forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan');
        const price = button.getAttribute('data-price');

        document.getElementById('selected-plan').textContent = plan;
        document.getElementById('selected-price').textContent = price;

        alert(`Plano ${plan} selecionado! Vá para a aba de pagamento.`);
    });
});
