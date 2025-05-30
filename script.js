const API_URL = 'https://exercicio2-atividade09-backend-1.onrender.com';

document.addEventListener('DOMContentLoaded', loadNotes);

async function loadNotes() {
  try {
    const response = await fetch(API_URL);
    const notes = await response.json();
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = notes.map(note => `
      <div class="note" data-id="${note.id}">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="editNote(${note.id})">Editar</button>
        <button onclick="deleteNote(${note.id})">Excluir</button>
      </div>
    `).join('');
  } catch (error) {
    console.error("Erro ao carregar notas:", error);
  }
}

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    loadNotes(); // Recarrega a lista após criar
    document.getElementById('noteForm').reset(); // Limpa o formulário
  } catch (error) {
    console.error("Erro ao criar nota:", error);
  }
});

async function editNote(id) {
  const newTitle = prompt("Novo título:");
  const newContent = prompt("Novo conteúdo:");
  
  if (newTitle && newContent) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });
      loadNotes(); // Recarrega a lista após editar
    } catch (error) {
      console.error("Erro ao editar nota:", error);
    }
  }
}

async function deleteNote(id) {
  if (confirm("Tem certeza que deseja excluir esta nota?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      loadNotes(); // Recarrega a lista após excluir
    } catch (error) {
      console.error("Erro ao excluir nota:", error);
    }
  }
}