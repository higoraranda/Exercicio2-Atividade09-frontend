const API = "https://exercicio2-atividade09-backend-1.onrender.com"; // Substitua com o link real

const form = document.getElementById("note-form");
const title = document.getElementById("title");
const content = document.getElementById("content");
const list = document.getElementById("notes-list");
const verNotasBtn = document.getElementById("ver-notas");

let editingId = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nota = { title: title.value, content: content.value };

  if (editingId) {
    await fetch(`${API}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nota),
    });
    editingId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nota),
    });
  }

  form.reset();
  loadNotas();
});

verNotasBtn.addEventListener("click", () => {
  list.style.display = "block";
  loadNotas();
});

async function loadNotas() {
  const res = await fetch(API);
  const notas = await res.json();

  list.innerHTML = "";
  notas.forEach((n) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${n.title}</strong><br>${n.content}<br>
      <button onclick="editNota(${n.id}, '${n.title.replace(/'/g, "\\'")}', '${n.content.replace(/'/g, "\\'")}')">Editar</button>
      <button onclick="deleteNota(${n.id})">Excluir</button>
      <hr>
    `;
    list.appendChild(li);
  });
}

async function deleteNota(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadNotas();
}

function editNota(id, t, c) {
  editingId = id;
  title.value = t;
  content.value = c;
}
