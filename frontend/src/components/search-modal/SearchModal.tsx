import React, { useState } from "react";
import BasicModal from "../basics/basic-modal/BasicModal";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import {
  StyledFormWrapper,
  StyledButton,
  StyledUsername,
} from "./StyledSearchModal";
import { useUser } from "../../context/UserContext";

interface Props {
  isOpen: boolean;
  handleClose: Function;
}

function SearchModal({ isOpen, handleClose }: Props) {
  const [searchForUser, setSearchForUser] = useState("");
  const [searchResult, setSearchResult] = useState<null | {
    _id: string;
    username: string;
  }>();
  const { searchUser } = useUser();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await searchUser(searchForUser);
    if (result) {
      setSearchResult(result);
      setSearchForUser("");
    }
  };

  return (
    <>
      <BasicModal isOpen={isOpen} handleClose={handleClose}>
        <>
          <StyledFormWrapper onSubmit={(e) => handleSearch(e)}>
            <BasicTextField
              placeholder="Search user..."
              value={searchForUser}
              handleChange={(ev: any) => setSearchForUser(ev.target.value)}
            />
            <StyledButton type="submit">Search</StyledButton>
          </StyledFormWrapper>
          {searchResult && (
            <StyledUsername>{searchResult.username}</StyledUsername>
          )}
        </>
      </BasicModal>
    </>
  );
}

export default SearchModal;
