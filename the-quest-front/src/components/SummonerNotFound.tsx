export function SummonerNotFound() {
  return (
    <div className="flex flex-col items-center text-white gap-2 m-2">
      <img src="/images/blitz_question.png" alt="" />
      <h2 className="text-lg">Invocateur introuvable</h2>
      <p>Avez vous pensé à mettre le #TAG du riot id dans votre recherche ?</p>
    </div>
  );
}
