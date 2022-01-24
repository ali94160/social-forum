import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
  isOpen?: boolean;
}

export const StyledCategoryList = styled.div<Props>`
  background-color: ${(props) => (props.isOpen ? 'var(--dark-teal)' : "var(--dark-blue)")};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 16px;
`;

export const StyledCategoryTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  padding-left: 10px;
  margin: 0.2rem;
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
  padding-right: 10px;
    :hover {
      cursor: pointer;
    }
`;

export const StyledWrapper = styled.div`
  align-self: flex-end;
`;