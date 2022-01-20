import React, { useState } from "react";
import BasicModal from "../basics/basic-modal/BasicModal";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import {
  StyledFormWrapper,
  StyledButton,
  StyledUsername,
  StyledSearchResult,
  StyledModeratorsWrapper,
  StyledModeratorsTitle,
} from "./StyledSearchModal";
import { useUser } from "../../context/UserContext";
import BasicChip from "../basics/basic-chip/BasicChip";
import { User } from "../../interfaces/User";

interface Props {
  isOpen: boolean;
  handleClose: Function;
  moderators: [User];
}

interface TrimmedUser {
  _id: string;
  username: string;
}

function SearchModal({ isOpen, handleClose, moderators }: Props) {
  const [searchForUser, setSearchForUser] = useState("");
  const [searchResult, setSearchResult] = useState<null | TrimmedUser>();
  const [noUserFound, setNoUserFound] = useState<null | boolean>(null);
  const { searchUser } = useUser();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await searchUser(searchForUser);
    if (result) {
      setSearchResult(result);
      setSearchForUser("");
      setNoUserFound(false);
      return;
    }
    setSearchResult(null);
    setNoUserFound(true);
  };

  const handleAddModerator = () => {
    //method to add a moderator
  };

  const handleDeleteModerator = () => {
    //method to delete a moderator
  };

  const renderSearchResult = () => (
    <>
      <StyledSearchResult>Search result</StyledSearchResult>
      {searchResult ? (
        <BasicChip
          deleteable={false}
          username={searchResult?.username}
          handleClick={handleAddModerator}
        />
      ) : (
        <p>No user found</p>
      )}
    </>
  );

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
          {searchResult && renderSearchResult()}
          {noUserFound === true && <p>No user found</p>}
          {moderators.length > 0 && (
            <StyledModeratorsWrapper>
              <StyledModeratorsTitle>Current Moderators:</StyledModeratorsTitle>
              {moderators?.map((m: User) => (
                <BasicChip
                  username={m.username}
                  handleClick={handleDeleteModerator}
                  deleteable={true}
                />
              ))}
            </StyledModeratorsWrapper>
          )}
        </>
      </BasicModal>
    </>
  );
}

export default SearchModal;
