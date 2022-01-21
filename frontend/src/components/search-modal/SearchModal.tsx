import React, { useState } from "react";
import BasicModal from "../basics/basic-modal/BasicModal";
import BasicTextField from "../basics/basic-text-field/BasicTextField";
import {
  StyledFormWrapper,
  StyledButton,
  StyledSearchResult,
  StyledModeratorsWrapper,
  StyledModeratorsTitle,
  StyledSaveButton,
  StyledContentWrapper,
} from "./StyledSearchModal";
import { useUser } from "../../context/UserContext";
import BasicChip from "../basics/basic-chip/BasicChip";
import { User } from "../../interfaces/User";
import { usePost } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";

interface Props {
  isOpen: boolean;
  handleClose: Function;
  moderators: User[];
  postId: string;
}

interface TrimmedUser {
  _id: string;
  username: string;
}

function SearchModal({ isOpen, handleClose, moderators, postId }: Props) {
  const { updateModerators } = usePost();
  const [searchForUser, setSearchForUser] = useState("");
  const [searchResult, setSearchResult] = useState<null | TrimmedUser>();
  const [noUserFound, setNoUserFound] = useState<null | boolean>(null);
  const [currentModerators, setCurrentModerators] = useState(moderators);
  const { searchUser } = useUser();
  const { user } = useAuth();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await searchUser(searchForUser);
    if (result && result?._id !== user._id) {
      setSearchResult(result);
      setSearchForUser("");
      setNoUserFound(false);
      return;
    }
    setSearchResult(null);
    setNoUserFound(true);
  };

  const handleAddModerator = (moderator: User) => {
    setSearchResult(null);
    const moderatorExists = currentModerators.find(
      (m: User) => m._id === moderator._id
    );
    !moderatorExists && setCurrentModerators([...currentModerators, moderator]);
  };

  const handleDeleteModerator = (moderatorId: string) => {
    setCurrentModerators(
      currentModerators.filter((m: User) => m._id !== moderatorId)
    );
  };

  const handleSaveModerators = () => {
    const moderatorsIds = currentModerators.map((m: User) => m._id);
    const moderatorObj = {
      moderatorsIds,
    };
    updateModerators(postId, moderatorObj);
    handleClose(setSearchResult);
  };

  const renderSearch = () => (
    <StyledFormWrapper onSubmit={(e) => handleSearch(e)}>
      <BasicTextField
        placeholder="Search user..."
        value={searchForUser}
        handleChange={(ev: any) => setSearchForUser(ev.target.value)}
      />
      <StyledButton type="submit">Search</StyledButton>
    </StyledFormWrapper>
  );

  const renderSearchResult = () => (
    <>
      {searchResult ? (
        <BasicChip
          deleteable={false}
          username={searchResult?.username}
          handleClick={() => handleAddModerator(searchResult)}
        />
      ) : (
        <p>No user found</p>
      )}
    </>
  );

  const renderModerators = () => (
    <StyledModeratorsWrapper>
      {currentModerators?.map((m: User) => (
        <BasicChip
          key={m._id}
          username={m.username}
          handleClick={() => handleDeleteModerator(m._id)}
          deleteable={true}
        />
      ))}
    </StyledModeratorsWrapper>
  );

  const renderSaveModerators = () => (
    <StyledSaveButton onClick={handleSaveModerators}>
      Save changes
    </StyledSaveButton>
  );

  return (
    <>
      <BasicModal
        isOpen={isOpen}
        handleClose={() => handleClose(setSearchResult)}
      >
        <StyledContentWrapper>
          {renderSearch()}
          <StyledSearchResult>Search result</StyledSearchResult>
          {searchResult && renderSearchResult()}
          <p>{noUserFound ? "No user found" : ""}</p>
          <StyledModeratorsTitle>Current Moderators:</StyledModeratorsTitle>
          {currentModerators.length > 0 && renderModerators()}
        </StyledContentWrapper>
        {renderSaveModerators()}
      </BasicModal>
    </>
  );
}

export default SearchModal;
