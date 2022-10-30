let words: string[] = [
    "BONDAD",
    "SINCERIDAD",
    "EMPATIA",
    "AMOR",
    "PACIENCIA",
    "GRATITUD",
    "HUMILDAD",
    "PERDON",
    "RESPONSABILIDAD",
    "SOLIDARIDAD"
  ];

export const GetRamdomWords = () => {
  
  const ramdomIndex = Math.floor(Math.random() * words.length);
  return words[ramdomIndex];
}
