function formatDate(dateString) {
  if (!dateString) {
    return "Datum není nastavené";
  }

  return new Date(dateString).toLocaleString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getCzechTimeWord(number, one, few, many) {
  if (number === 1) {
    return one;
  }

  if (number >= 2 && number <= 4) return few;

  return many;
}

function getRemainingTime(dateString) {
  if (!dateString) {
    return "Datum není nastavené";
  }

  const now = new Date();
  const targetDate = new Date(dateString);
  const difference = targetDate - now;

  if (difference <= 0) {
    return "Termín už nastal";
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  const dayWord = getCzechTimeWord(days, "den", "dny", "dní");

  const hourWord = getCzechTimeWord(hours, "hodina", "hodiny", "hodin");

  const minuteWord = getCzechTimeWord(minutes, "minuta", "minuty", "minut");

  return `
    ${days} ${dayWord},
    ${hours} ${hourWord},
    ${minutes} ${minuteWord}
  `;
}
