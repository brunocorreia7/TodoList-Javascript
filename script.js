document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('novatarefa');
    const botao = document.getElementById('botao');
    const lista = document.getElementById('lista-tarefas');
    const template = document.getElementById('template-tarefa');

    // Função para salvar no localStorage
    function salvarTarefas() {
        const tarefas = [];
        lista.querySelectorAll('li').forEach(li => {
            const texto = li.querySelector('.texto').textContent;
            const concluida = li.querySelector('.tarefa-check').checked;
            tarefas.push({ texto, concluida });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    // Função para adicionar tarefa
    function addTarefa(text, concluida = false) {
        const clone = template.content.cloneNode(true);
        const span = clone.querySelector('.texto');
        const check = clone.querySelector('.tarefa-check');
        const remover = clone.querySelector('.remover');

        span.textContent = text;
        check.checked = concluida;

        // evento de remover
        remover.addEventListener('click', e => {
            e.target.closest('li').remove();
            salvarTarefas();
        });

        // evento de marcar concluída
        check.addEventListener('change', salvarTarefas);

        lista.appendChild(clone);
        salvarTarefas(); // salva toda vez que adiciona
    }

    // Carregar tarefas salvas ao abrir a página
    function carregarTarefas() {
        const salvas = JSON.parse(localStorage.getItem('tarefas') || '[]');
        salvas.forEach(t => addTarefa(t.texto, t.concluida));
    }

    botao.addEventListener('click', () => {
        const val = input.value.trim();
        if (!val) return;
        addTarefa(val);
        input.value = '';
        input.focus();
    });

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') botao.click();
    });

    carregarTarefas(); // chama ao iniciar
});

