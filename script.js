// Função para buscar os repositórios mais bem avaliados no GitHub
async function fetchTopRepositories(query = '') {
    let url = 'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=10';
    if (query) {
        url = `https://api.github.com/search/repositories?q=${query}+stars:>10000&sort=stars&order=desc&per_page=10`;
    }
    
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
        repoElement.classList.add('repo', 'card', 'p-4', 'mb-4', 'shadow-lg', 'border-0');
        repoElement.innerHTML = `
            <h2 class="h4 text-primary"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
            <p class="text-muted">${repo.description || 'Sem descrição'}</p>
            <p class="fw-bold">⭐ ${repo.stargazers_count} | 🖥️ ${repo.language || 'Desconhecido'}</p>
        `;
        container.appendChild(repoElement);
    });
}

// Adiciona evento para busca dinâmica
document.addEventListener('DOMContentLoaded', () => {
    fetchTopRepositories();
    document.getElementById('search-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const query = document.getElementById('search-input').value;
        fetchTopRepositories(query);
    });
});