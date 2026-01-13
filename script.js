const sectionsDiv = document.getElementById("sections");
const labels = (localStorage.getItem("sections") || "").split("\n").filter(Boolean);

let state = {};

const defaultSections = [
  "FRENTE SITE", "PORTÃO DE ACESSO - FRENTE", "MEDIDOR DE ENERGIA DO SITE",
  "POSTE DE ENTRADA", "CAIXA DE PASSAGEM EL/FO", "CAIXA DE PASSAGEM EL/FO (ABERTA)",
  "CAIXA DE PASSAGEM TX", "CAIXA DE PASSAGEM TX (ABERTA)", "VISTA DAS VALAS DE ENCAMINHAMENTO",
  "PONTO 1 - MALHA DE ATERRAMENTO", "PONTO 2 - MALHA DE ATERRAMENTO", "PONTO 3 - MALHA DE ATERRAMENTO",
  "PONTO 4 - MALHA DE ATERRAMENTO", "PONTO 5 - MALHA DE ATERRAMENTO", "ENVELOPAMENTO DA LINHA DE DUTOS",
  "BASE DE EQUIPAMENTOS", "ESTEIRAMENTO HORIZONTAL", "ATERRAMENTO - ESTEIRAMENTO HORIZONTAL",
  "FOTO GERAIS - SITE FINALIZADO", "RELOGIO MEDIDOR", "DISJUNTOR DE ENTRADA CA",
  "BASE DE EQUIPAMENTOS: SOBRA DE CABO, MEDIÇÃO TENSÃO", "MEDIÇÃO DE TENSÃO - ENTRADA GABINETE",
  "CAIXA DE ATERRAMENTO", "ATERRAMENTO GRADIL", "CONEXÃO DAS FASES", "MEDIÇÃO - ALIMENTAÇÃO ENTRADA",
  "MEDIÇÃO TENSÃO - DISJUNTOR ENTRADA", "CONVERSORES", "GABINETE FIXADO COM GRADIL", "GABINETE - PORTA ABERTA",
  "FONTE INSTALADA E CONFIGURADA", "DISPLAY CONTROLADORA"
];

// Seção de fotos
function renderSections() {
  const sectionsToRender = labels.length > 0 ? labels : defaultSections;

  sectionsToRender.forEach((section, idx) => {
    const div = document.createElement("div");
    div.className = "section";
    div.innerHTML = `
      <h3>${section}</h3>
      <textarea name="text_${idx}" placeholder="Observações..." required></textarea>
      <input type="file" name="photos_${idx}" multiple />
      <div class="image-preview" id="preview_${idx}"></div>
    `;

    const fileInput = div.querySelector(`input[type="file"]`);
    const previewDiv = div.querySelector(`#preview_${idx}`);

    fileInput.onchange = e => {
      const files = Array.from(e.target.files).slice(0, 10);
      state[idx] = files;

      previewDiv.innerHTML = "";
      files.forEach((file, idx) => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.onclick = () => {
          if (confirm("Remover esta foto?")) {
            state[idx].splice(idx, 1);
            previewDiv.removeChild(img);
          }
        };
        previewDiv.appendChild(img);
      });
    };

    sectionsDiv.appendChild(div);
  });
}

// Enviar relatório
document.getElementById("reportForm").onsubmit = async e => {
  e.preventDefault();
  const formData = new FormData(e.target);

  for (let i = 0; i < defaultSections.length; i++) {
    if (state[i]) {
      state[i].forEach(file => {
        formData.append("photos", file);
      });
    }
  }

  const status = document.getElementById("status");
  status.innerText = "Enviando...";

  try {
    const res = await fetch('/api/submit-report', {
      method: 'POST',
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

renderSections();
