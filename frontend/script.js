// Seleciona o contêiner onde as seções serão renderizadas
const sectionsDiv = document.getElementById("sections");

// Carrega as seções salvas do localStorage (se existirem)
const labels = (localStorage.getItem("sections") || "").split("\n").filter(Boolean);

// Cria as seções dinamicamente com base nas labels salvas
labels.forEach((label, i) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>${label}</h3>
    <textarea name="text_${i}" required></textarea>
    <input type="file" name="photos_${i}" multiple />
  `;
  sectionsDiv.appendChild(div);
});

// Enviar o formulário quando o botão "Enviar Relatório" for clicado
document.getElementById("reportForm").onsubmit = async e => {
  e.preventDefault(); // Impede o envio normal do formulário (recarga da página)

  // Cria um novo FormData com os dados do formulário
  const formData = new FormData(e.target);

  // Envia os dados para o backend (endpoint /api/submit-report)
  try {
    const response = await fetch("/api/submit-report", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      alert("Relatório enviado com sucesso!");
    } else {
      alert("Erro ao enviar o relatório: " + data.error);
    }
  } catch (error) {
    console.error("Erro ao enviar o relatório:", error);
    alert("Houve um erro ao enviar o relatório.");
  }
};
