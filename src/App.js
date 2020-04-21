import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function getRepository() {
    const response = await api.get('/repositories');

    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Desafio ReactJS - ${Date.now()}`,
      url: 'https://github.com/josepholiveira',
      techs: ['React', 'Node.js']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      setRepositories(prevRepositories => prevRepositories.filter(repository => repository.id !== id));
    }
  }

  useEffect(() => {
    getRepository();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
