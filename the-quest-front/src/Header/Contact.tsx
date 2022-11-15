import styled from "@emotion/styled";
import { useState } from "react";

export function Contact() {
  const [mailVisible, setMailVisible] = useState(false);

  const ContactContainer = styled.div`
    position: relative;
  `;
  const Contact = styled.h5`
    margin: 0.5em;
    margin-right: 2em;
    color: ${mailVisible ? "#dbae6a" : "#7e633b"};
    visibility: ${!mailVisible ? "visible" : "hidden"};
    display: ${mailVisible && "none"};
    cursor: pointer;
    transition: color 0.5s;
    &:hover {
      color: #dbae6a;
    }
  `;
  const Mailbox = styled.div`
    position: relative;
    border: 2px solid #7e633b;
    color: #dbae6a;
    padding: 0.8em;
    width: 20em;
    margin: 0.5em;
    margin-right: 1em;
    background-color: rgba(1, 12, 22, 1);
    display: ${!mailVisible && "none"};
    visibility: ${mailVisible ? "visible" : "hidden"};
  `;
  const CloseButton = styled.div`
    position: absolute;
    top: -0.7em;
    right: -0.6em;
    z-index: 1;
    padding: 0.2em;
    background-color: rgba(1, 12, 22, 0.5);
    border-radius: 1em;
    color: #7e633b;
    cursor: pointer;
    &:hover {
      color: #dbae6a;
      background-color: rgba(1, 12, 22, 0.8);
    }
  `;
  return (
    <ContactContainer>
      <Contact
        onClick={() => {
          mailVisible ? setMailVisible(false) : setMailVisible(true);
        }}
      >
        Contact
      </Contact>
      <Mailbox>
        JeanPrank.jp@gmail.com
        <CloseButton
          onClick={() => {
            mailVisible ? setMailVisible(false) : setMailVisible(true);
          }}
        >
          x
        </CloseButton>
      </Mailbox>
    </ContactContainer>
  );
}
