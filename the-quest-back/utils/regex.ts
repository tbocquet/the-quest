export function getFirstFloatFromString(str: string): number | null {
  console.log("--");
  console.log(str);
  const regexMatches = str.match(/[-+]?\d*\.?\d+/);

  if (regexMatches === null) {
    return null;
  }

  const res = parseFloat(regexMatches[0].replace(",", "."));
  console.log(res);
  return isNaN(res) ? null : res;
}

export function extractNthWord(inputString: string, n: number): string | null {
  // Utilisation d'une expression régulière pour extraire les mots de la chaîne
  const words = inputString.match(/\b\w+\b/g);

  // Vérifie si le mot à l'index n existe et le renvoie, sinon renvoie null
  if (words && n >= 0 && n < words.length) {
    return words[n];
  } else {
    return null;
  }
}

export function extractNumberBeforePlayed(inputString: string): number | null {
  const regex = /(\d+) Jouée/g;
  const match = regex.exec(inputString);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  } else {
    return null;
  }
}

export function extractVersion(inputString: string): string | null {
  const regex = /S(\d+\.\d+)/;
  const match = regex.exec(inputString);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

export function romanToNumber(roman: string): number {
  const romanNumerals: { [key: string]: number } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;

  for (let i = 0; i < roman.length; i++) {
    const currentSymbol = roman[i];
    const currentValue = romanNumerals[currentSymbol];
    const nextSymbol = roman[i + 1];
    const nextValue = romanNumerals[nextSymbol];

    if (nextValue && currentValue < nextValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
  }

  return result;
}

export function removeHtmlTags(inputString: string): string {
  // Utilise une expression régulière pour supprimer les balises HTML
  const str = inputString.replace(/<\/?[^>]+(>|$)/g, " ");
  return removeExtraSpaces(str);
}

export function removeExtraSpaces(inputString: string): string {
  const trimmedString = inputString.trim();
  return trimmedString.replace(/\s+/g, " ");
}

export function removeFirstNCharacters(inputString: string, n: number): string {
  if (n >= inputString.length) {
    return ""; // Si n est plus grand ou égal à la longueur de la chaîne, retourne une chaîne vide
  }
  return inputString.substring(n);
}
