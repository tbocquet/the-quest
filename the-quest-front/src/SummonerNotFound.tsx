import styled from "@emotion/styled";

export function SummonerNotFound() {
  const Img = styled.img`
    margin: 1em;
  `;
  const Msg = styled.h5`
    color: #c4b998;
  `;
  return (
    <div>
      <Img src="/images/blitz_question.png" alt="" />
      <Msg>Invocateur introuvable</Msg>
    </div>
  );
}
