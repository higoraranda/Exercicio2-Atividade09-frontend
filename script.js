const API_URL = 'https://exercicio2-atividade09-backend-1.onrender.com';

async function loadNotes() {
  const response = await fetch(API_URL);
  const notes = await response.json();
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = notes.map(note => `
    <div class="note">
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button onclick="editNote(${note.id})">Editar</button>
      <button onclick="deleteNote(${note.id})">Excluir</button>
    </div>
  `).join('');
}

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });
  loadNotes();
});

async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadNotes();
}

loadNotes();