import styled from 'styled-components';

interface Props {
  isOpen?: boolean;
}

export const StyledBanlist = styled.div<Props>`
  background-color: ${(props) => (props.isOpen ? 'var(--dark-teal)' : "var(--dark-blue)")};
`;

