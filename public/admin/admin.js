import { useState } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [panelVisible, setPanelVisible] = useState(false);
  const [labels, setLabels] = useState(localStorage.getItem('sections') || '');

  const login = () => {
    if (password === 'Nova@123') {
      setPanelVisible(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const save = () => {
    localStorage.setItem('sections', labels);
    alert("Seções salvas");
  };

  const addSection = () => {
    setLabels(labels + "\n" + "Nova Seção");
  };

  return (
    <div>
      <h1>Admin</h1>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Senha" 
      />
      <button onClick={login}>Login</button>

      {panelVisible && (
        <div id="panel">
          <h2>Seções do Relatório</h2>
          <textarea 
            id="labels" 
            value={labels} 
            onChange={(e) => setLabels(e.target.value)} 
            placeholder="Uma legenda por linha" 
          />
          <button onClick={save}>Salvar</button>
          <button onClick={addSection}>Adicionar Seção</button>
        </div>
      )}
    </div>
  );
}
