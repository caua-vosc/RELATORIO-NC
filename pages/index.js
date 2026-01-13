import { useEffect, useState } from 'react';
import '../public/css/style.css';

export default function Home() {
  const [sections, setSections] = useState([]);
  const [siteId, setSiteId] = useState('');
  const [technician, setTechnician] = useState('');

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
        <div className="form-group">
          <label>📍 ID do Site</label>
          <input 
            type="text" 
            name="siteId" 
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)} 
            required 
            placeholder="Ex: SITE_123"
          />
        </div>

        <div className="form-group">
          <label>👤 Técnico</label>
          <input 
            type="text" 
            name="technician" 
            value={technician}
            onChange={(e) => setTechnician(e.target.value)} 
            required 
            placeholder="Seu nome"
          />
        </div>

        {sections.map((section, i) => (
          <div key={i} className="section">
            <h3>{section}</h3>
            <textarea name={`text_${i}`} placeholder="Observações..." required />
            <input type="file" name={`photos_${i}`} multiple />
          </div>
        ))}

        <button type="submit">📤 Enviar Relatório</button>
      </form>
    </div>
  );
}


<script src="script.js"></script>  <!-- Referência ao JavaScript -->
</body>
</html>
