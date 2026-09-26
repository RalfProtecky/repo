const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const button = document.getElementById("next");

let quotes = [];
let lastIndex = -1;

function pickIndex() {
  if (quotes.length < 2) return 0;
  let i;
  do {
    i = Math.floor(Math.random() * quotes.length);
  } while (i === lastIndex);
  return i;
}

function showRandomQuote() {
  lastIndex = pickIndex();
  const q = quotes[lastIndex];
  quoteEl.textContent = q.text;
  authorEl.textContent = q.author || "";
}

button.disabled = true;
button.addEventListener("click", showRandomQuote);

fetch("quotes.json", { cache: "no-cache" })
  .then((res) => {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  })
  .then((data) => {
    quotes = data.filter((q) => q && q.text);
    if (!quotes.length) throw new Error("empty");
    showRandomQuote();
    button.disabled = false;
  })
  .catch(() => {
    quoteEl.textContent = "Could not load quotes.json";
  });
