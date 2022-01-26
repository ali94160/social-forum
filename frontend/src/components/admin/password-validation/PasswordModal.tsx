import {
  StyledInputContainer,
  StyledCloseButton,
  StyledButtonContainer
} from './StyledPasswordModal';
import { StyledTealButton } from "../../basics/StyledTealButton";
import BasicModal from '../../basics/basic-modal/BasicModal';
import BasicVisibilityInput from "../../basics/basic-visibility-input/BasicVisibilityInput";
import { BaseSyntheticEvent, useEffect } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
  password: string;
  setPassword: Function;
  status: number;
  setStatus: Function;
  showPassword: boolean;
  setShowPassword: Function;
  handleConfirm: Function;
  infoText?: JSX.Element | JSX.Element[];
  children?: any;
};

function PasswordModal({
  isOpen,
  setIsOpen,
  password,
  setPassword,
  status,
  setStatus,
  showPassword,
  setShowPassword,
  handleConfirm,
  children
}: Props) {

  const handleClose = () => {
    setIsOpen(!isOpen);
  }

  return (
    <BasicModal isOpen={isOpen} handleClose={handleClose}>
      {children}
      <StyledInputContainer>
          <BasicVisibilityInput
              value={password}
              variant="outlined"
              label="Password"
              showText={showPassword}
              setShowText={setShowPassword}
              handleChange={(ev: BaseSyntheticEvent) =>
                setPassword(ev.target.value)
              }
            required
            error={status !== 200 && status !== 0}
          />
        </StyledInputContainer>
        <StyledButtonContainer>
          <StyledCloseButton
            type="button"
            variant="contained"
            onClick={() =>
            {
              setIsOpen(!isOpen);
              setPassword('');
              setStatus(0);
            }}
          >
            Cancel
          </StyledCloseButton>
          <StyledTealButton
            type="submit"
            variant="contained"
            onClick={() => handleConfirm()}
          >
            Confirm
          </StyledTealButton>
        </StyledButtonContainer>
      </BasicModal>
  )
}

export default PasswordModal