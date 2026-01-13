const sectionsDiv = document.getElementById("sections");
const labels = (localStorage.getItem("sections") || "").split("\n").filter(Boolean);
let state = {};

labels.forEach((label, i) => {
  const div = document.createElement("div");
  div.className = "section";
  div.innerHTML = `
    <h3>${label}</h3>
    <textarea name="text_${i}" placeholder="Observações..." required></textarea>
    <input type="file" name="photos_${i}" multiple />
    <div class="image-preview" id="preview_${i}"></div>
  `;

  const fileInput = div.querySelector(`input[type="file"]`);
  const previewDiv = div.querySelector(`#preview_${i}`);

  fileInput.onchange = e => {
    const files = Array.from(e.target.files).slice(0, 10);
    state[i] = files;

    previewDiv.innerHTML = "";
    files.forEach((file, idx) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onclick = () => {
        if (confirm("Remover esta foto?")) {
          state[i].splice(idx, 1);
          previewDiv.removeChild(img);
        }
      };
      previewDiv.appendChild(img);
    });
  };

  sectionsDiv.appendChild(div);
});

document.getElementById("reportForm").onsubmit = async e => {
  e.preventDefault();
  const formData = new FormData(e.target);

  // Adiciona arquivos manualmente para cada seção
  for (let i = 0; i < labels.length; i++) {
    if (state[i]) {
      state[i].forEach(file => {
        formData.append("photos", file);
      });
    }
  }

  const status = document.getElementById("status");
  status.innerText = "Enviando...";

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (data.success) status.innerText = "Relatório enviado com sucesso!";
    else status.innerText = "Erro: " + (data.error || "desconhecido");
  } catch (err) {
    console.error(err);
    status.innerText = "Erro no envio";
  }
};

