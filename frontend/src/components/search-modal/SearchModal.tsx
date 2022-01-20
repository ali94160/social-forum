import React, { useState } from "react";
import BasicModal from "../basics/basic-modal/BasicModal";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import { StyledWrapper, StyledButton } from "./StyledSearchModal";

interface Props {
  isOpen: boolean;
  handleClose: Function;
}

function SearchModal({ isOpen, handleClose }: Props) {
  const [searchUser, setSearchUser] = useState("");
  return (
    <>
      <BasicModal isOpen={isOpen} handleClose={handleClose}>
        <StyledWrapper>
          <BasicTextField
            placeholder="Search user..."
            value={searchUser}
            handleChange={(ev: any) => setSearchUser(ev.target.value)}
          />
          <StyledButton>Search</StyledButton>
        </StyledWrapper>
      </BasicModal>
    </>
  );
}

export default SearchModal;
