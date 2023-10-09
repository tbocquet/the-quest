export function formatTime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [];

  if (days > 0) {
    formattedTime.push(`${days} jour${days !== 1 ? "s" : ""}`);
  }

  if (hours > 0) {
    formattedTime.push(`${hours} heure${hours !== 1 ? "s" : ""}`);
  }

  if (minutes > 0) {
    formattedTime.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  }

  if (remainingSeconds > 0 || formattedTime.length === 0) {
    formattedTime.push(
      `${remainingSeconds} seconde${remainingSeconds !== 1 ? "s" : ""}`
    );
  }

  return formattedTime.join(", ");
}

export function formatTime2(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [];

  if (days > 0) {
    formattedTime.push(`${days} jour${days !== 1 ? "s" : ""}`);
  }

  if (hours > 0) {
    formattedTime.push(`${String(hours).padStart(2, "0")} : `);
  }

  formattedTime.push(`${String(minutes).padStart(2, "0")} : `);

  formattedTime.push(String(remainingSeconds).padStart(2, "0"));

  return formattedTime.join(" ");
}

export function secondsElapsedSince(startTimeMilliseconds: number): number {
  const currentTimeMilliseconds = new Date().getTime();
  const elapsedTimeMilliseconds =
    currentTimeMilliseconds - startTimeMilliseconds;
  const elapsedTimeSeconds = Math.floor(elapsedTimeMilliseconds / 1000);
  return elapsedTimeSeconds;
}
