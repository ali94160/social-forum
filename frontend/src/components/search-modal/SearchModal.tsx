import React from "react";
import BasicModal from "../basics/basic-modal/BasicModal";

interface Props {
  isOpen: boolean;
  handleClose: Function;
}

function SearchModal({isOpen, handleClose}: Props) {
  return (
    <>
      <BasicModal isOpen={isOpen} handleClose={handleClose}>
        <input type="text" />
        <button>Search</button>
      </BasicModal>
    </>
  );
}

export default SearchModal;
