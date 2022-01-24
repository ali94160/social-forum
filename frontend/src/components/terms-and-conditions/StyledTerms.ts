import styled from "styled-components";

export const StyledWrapper = styled.div`
  max-height: 25rem;
  overflow: scroll;
`;

export const StyledHeadTitle = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
`;

export const StyledTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const StyledText = styled.p`
  font-size: 0.7;
`;

export const StyledBoldText = styled.span`
  font-size: 0.7;
  font-weight: bold;
`;

export const StyledButton = styled.button`
  width: 50%;
  font-size: 1.3rem;
  display: block;
  border: none;
  background: var(--dark-teal);
  border-radius: 3px;
  margin: 1rem auto;
  color: white;
  padding: 1rem;
`;
