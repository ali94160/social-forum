import styled from "styled-components";

export const StyledFormWrapper = styled.form`
  display: flex;
  gap: 0.5rem;
`;

export const StyledButton = styled.button`
  border: none;
  padding: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: var(--dark-teal);
  color: white;
  border-radius: 3px;
`;

export const StyledSearchResult = styled.p`
  font-size: 1.3rem;
  color: grey;
  margin: 0.5rem 0;
`;

export const StyledUsername = styled.p`
  font-size: 1rem;
  margin: 0;
`;

export const StyledModeratorsWrapper = styled.div``;

export const StyledModeratorsTitle = styled.p`
  font-size: 1.3rem;
  color: grey;
  margin: 0.5rem 0;
`;

export const StyledSaveButton = styled.button`
  border: none;
  padding: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: var(--dark-teal);
  color: white;
  border-radius: 3px;
  float: right;
  margin-top: 2rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
`;

export const StyledContentWrapper = styled.div`
  min-height: 10vh;
`