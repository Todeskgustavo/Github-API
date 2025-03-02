// Função para buscar os repositórios mais bem avaliados no GitHub
async function fetchTopRepositories() {
    const url = 'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=10';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        displayRepositories(data.items);
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
    }
}

// Função para exibir os repositórios na página
function displayRepositories(repositories) {
    const container = document.getElementById('repo-list');
    container.innerHTML = '';
    
    repositories.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.classList.add('repo');
        repoElement.innerHTML = `
            <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
            <p>${repo.description || 'Sem descrição'}</p>
            <p><strong>⭐ ${repo.stargazers_count} | 🖥️ ${repo.language || 'Desconhecido'}</strong></p>
        `;
        container.appendChild(repoElement);
    });
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchTopRepositories);