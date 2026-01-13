import { useEffect, useState } from 'react';

export default function Home() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const storedSections = localStorage.getItem('sections');
    if (storedSections) {
      setSections(storedSections.split("\n").filter(Boolean));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const res = await fetch('/api/submit-report', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("Relatório enviado com sucesso!");
      } else {
        alert("Erro ao enviar relatório: " + data.error);
      }
    } catch (error) {
      console.error("Erro ao enviar o relatório:", error);
      alert("Houve um erro ao enviar o relatório.");
    }
  };

  return (
    <div>
      <h1>Relatório de RFI</h1>
      <form id="reportForm" onSubmit={handleSubmit}>
        <label>Site ID</label>
        <input name="siteId" required />

        <label>Técnico</label>
        <input name="technician" required />

        {sections.map((section, i) => (
          <div key={i}>
            <h3>{section}</h3>
            <textarea name={`text_${i}`} placeholder="Observações..." required />
            <input type="file" name={`photos_${i}`} multiple />
          </div>
        ))}

        <button type="submit">Enviar Relatório</button>
      </form>
    </div>
  );
}
