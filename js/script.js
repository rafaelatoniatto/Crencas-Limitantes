const questions = ["Evito me candidatar a oportunidades porque acho que “não estou pronta”.","Tenho medo de cometer erros e isso me impede de tentar algo novo.","Acredito que preciso agradar todo mundo para ser aceita.","Raramente falo sobre minhas conquistas, esperando que “meu trabalho fale por si”.","Sinto que, para ser reconhecida, preciso trabalhar mais do que os outros.","Acho que não mereço um salário maior ou promoções sem “provar muito mais” meu valor.","Dizer “não” me deixa desconfortável, mesmo quando estou sobrecarregada.","Penso que não tenho perfil ou capacidade para liderar.","Acredito que já é tarde para mudar de carreira ou investir em novos sonhos.","Tenho dificuldade em priorizar meus objetivos sem me sentir egoísta."];

const form = document.getElementById("testForm");
const questionsContainer = document.getElementById("questionsContainer");
const resultSection = document.getElementById("resultSection");

const results = {
  low: {
    title: "Crenças limitantes pouco presentes",
    text: "Suas respostas indicam que crenças limitantes aparecem pouco no seu momento atual. Continue observando seus pensamentos e decisões para preservar essa autonomia."
  },
  moderate: {
    title: "Crenças limitantes moderadas",
    text: "Suas respostas indicam a presença de crenças que já podem interferir em decisões estratégicas. O autoconhecimento pode ajudar a identificar esses padrões e ampliar suas possibilidades."
  },
  high: {
    title: "Crenças limitantes fortes",
    text: "Suas respostas indicam crenças limitantes mais presentes, que podem afetar significativamente sua confiança e crescimento. Este resultado pode ser um convite para olhar com mais atenção para os padrões que influenciam suas escolhas."
  }
};

questionsContainer.innerHTML = questions.map((question, index) => `
  <section class="card question-card" data-question="${index + 1}">
    <div class="q-meta">QUESTÃO ${index + 1} DE ${questions.length}</div>
    <h2 class="q-text">${question} <span class="required">*</span></h2>
    <div class="scale-options">
      ${[1,2,3,4,5].map(value => `
        <label class="scale-option">
          <span>${value}</span>
          <input type="radio" name="q${index + 1}" value="${value}">
        </label>
      `).join("")}
    </div>
    <div class="error-msg question-error">Selecione uma resposta.</div>
  </section>
`).join("");

form.addEventListener("submit", event => {
  event.preventDefault();

  document.querySelectorAll(".has-error").forEach(el => el.classList.remove("has-error"));

  const name = document.getElementById("name").value.trim();
  const personal = document.getElementById("personalData");
  const personalError = document.getElementById("personalError");

  let valid = true;
  let total = 0;

  if (!name) {
    valid = false;
    personal.classList.add("has-error");
    personalError.textContent = "Preencha seu nome.";
  }

  questions.forEach((_, index) => {
    const selected = document.querySelector(`input[name="q${index + 1}"]:checked`);
    const card = document.querySelector(`[data-question="${index + 1}"]`);

    if (!selected) {
      valid = false;
      card.classList.add("has-error");
    } else {
      total += Number(selected.value);
    }
  });

  if (!valid) {
    const first = document.querySelector(".has-error");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const result = total <= 19 ? results.low : total <= 34 ? results.moderate : results.high;

  document.getElementById("resultTitle").textContent = result.title;
  document.getElementById("greetingText").textContent = `${name}, veja abaixo o resultado das suas respostas.`;
  document.getElementById("totalScore").textContent = total;
  document.getElementById("resultLevel").textContent = result.title;
  document.getElementById("resultDescription").textContent = result.text;

  form.hidden = true;
  document.querySelector(".instructions").hidden = true;
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("printButton").addEventListener("click", () => window.print());

document.getElementById("restartButton").addEventListener("click", () => {
  form.reset();
  form.hidden = false;
  document.querySelector(".instructions").hidden = false;
  resultSection.hidden = true;
  document.querySelectorAll(".has-error").forEach(el => el.classList.remove("has-error"));
  window.scrollTo({ top: 0, behavior: "smooth" });
});
