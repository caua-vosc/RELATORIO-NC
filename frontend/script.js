const sectionsDiv = document.getElementById("sections");
const labels = (localStorage.getItem("sections") || "").split("\n").filter(Boolean);

labels.forEach((label, i) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>${label}</h3>
    <textarea name="text_${i}"></textarea>
    <input type="file" name="photos_${i}" multiple />
  `;
  sectionsDiv.appendChild(div);
});

document.getElementById("reportForm").onsubmit = async e => {
  e.preventDefault();
  const formData = new FormData(e.target);

  await fetch("/api/submit-report", {
    method: "POST",
    body: formData
  });

  alert("Report sent");
};
