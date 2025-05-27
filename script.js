// Define o nome de usuário do GitHub a ser consultado
const githubUser = "Smith171"; // Altere para o seu nome de usuário do GitHub, se necessário

// Função assíncrona para carregar os projetos públicos do usuário do GitHub
async function carregarProjetosGitHub() {
    // Seleciona o elemento UL onde os projetos serão listados
    const ul = document.getElementById('github-projects');
    // Mensagem inicial enquanto carrega
    ul.innerHTML = '<li>Carregando projetos...</li>';
    try {
        // Requisição para a API pública do GitHub para obter os repositórios do usuário
        const resposta = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`);
        // Se a resposta não for OK, lança um erro
        if (!resposta.ok) throw new Error('Erro ao buscar projetos.');

        // Converte a resposta em JSON (lista de repositórios)
        const repos = await resposta.json();
        // Se o usuário não tiver projetos públicos
        if (!repos.length) {
            ul.innerHTML = '<li>Nenhum projeto encontrado.</li>';
            return;
        }
        // Limpa o conteúdo anterior
        ul.innerHTML = "";
        // Para cada repositório encontrado, cria um item na lista
        repos.forEach(repo => {
            const li = document.createElement('li');
            // Adiciona link para o repositório e a descrição (se houver)
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'Sem descrição.'}`;
            ul.appendChild(li);
        });
    } catch (e) {
        // Exibe mensagem de erro caso a API falhe
        ul.innerHTML = `<li>Erro ao carregar projetos: ${e.message}</li>`;
    }
}

// Quando o DOM estiver carregado, executa a função para buscar os projetos
document.addEventListener('DOMContentLoaded', carregarProjetosGitHub);