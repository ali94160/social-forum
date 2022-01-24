import {
  StyledWrapper,
  StyledTitleTypography,
  StyledTitle,
  StyledText,
} from "./StyledTextbox";

function TextBox() {
  return (
    <StyledWrapper>
      <StyledTitleTypography>How to use this panel:</StyledTitleTypography>
      <StyledTitle>Banlist:</StyledTitle>
      <StyledText>
        The banlist shows all the current banned users. <br />
        To unban a user click on the "unban user" button
      </StyledText>
      <StyledTitle>Categories:</StyledTitle>
      <StyledText>
        The category list shows all the active categories on the forum. To
        add/delete or change a category press the relative buttons.
      </StyledText>
    </StyledWrapper>
  );
}

export default TextBox;
