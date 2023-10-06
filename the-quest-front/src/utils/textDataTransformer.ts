export function numberAbrevier(nombre: number): string {
  if (nombre < 1000) {
    return nombre.toString();
  } else if (nombre < 1000000) {
    return (nombre / 1000).toFixed(1) + "K";
  } else if (nombre < 1000000000) {
    return (nombre / 1000000).toFixed(1) + "M";
  } else {
    return (nombre / 1000000000).toFixed(1) + "G";
  }
}

export function toCamelCase(input: string): string {
  // Divise la chaîne en mots en utilisant des espaces, des tirets ou des underscores comme séparateurs
  const words = input.split(/[\s\-_]+/);

  // Si la chaîne était vide ou ne contenait que des caractères spéciaux, retourne telle quelle
  if (words.length === 0) {
    return input;
  }

  // Prend la première partie en minuscules et concatène les parties suivantes en les capitalisant
  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  // Rejoins les mots pour former la chaîne en camelCase
  const camelCaseString = camelCaseWords.join("");

  return camelCaseString;
}

export function firstLetterUpperCase(phrase: string): string {
  if (phrase.length === 0) {
    return phrase; // Gérer le cas d'une chaîne vide si nécessaire
  }

  const premiereLettreMajuscule = phrase.charAt(0).toUpperCase();
  const resteDeLaPhrase = phrase.slice(1);

  return premiereLettreMajuscule + resteDeLaPhrase;
}
