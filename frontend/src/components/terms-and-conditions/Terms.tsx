import React from "react";
import {
  StyledWrapper,
  StyledHeadTitle,
  StyledTitle,
  StyledText,
  StyledBoldText,
  StyledButton,
} from "./StyledTerms";

interface Props {
  setReadMore: Function;
}

function Terms({ setReadMore }: Props) {
  return (
    <StyledWrapper>
      <StyledHeadTitle>Terms & Conditions</StyledHeadTitle>
      <StyledTitle>§1.0 Community Rules:</StyledTitle>
      <ol>
        <li>
          <StyledBoldText>No</StyledBoldText> Rasism.
        </li>
        <li>
          <StyledBoldText>No</StyledBoldText> spamming.
        </li>
        <li>
          <StyledBoldText>No</StyledBoldText> sexual assault.
        </li>
        <li>
          <StyledBoldText>No</StyledBoldText> advertisements without our
          permission.
        </li>
        <li>
          <StyledBoldText>No</StyledBoldText> bullying.
        </li>
        <li>
          You’re <StyledBoldText>NOT</StyledBoldText> allowed to gain access to
          (or attempt to gain access to) another user’s Account.
        </li>
        <li>
          Don’t break the site or do anything that interferes with normal use of
          Social-Forum.
        </li>
      </ol>
      <StyledTitle>
        By breaking any of the rules will result in a permanent ban of the
        community.
      </StyledTitle>
      <StyledText>
        §1.1 By creating an Account on our forum, you grant us the authority
        over your posts and comments. <br /> <br />
        §1.2 By creating an Account we will have the rights to use your data for
        security reasons. <br /> <br />
        §1.3 The data we are using for security reason are following:
      </StyledText>
      <ul>
        <li>IP-Adress</li>
        <li>Email</li>
      </ul>
      <StyledText>
        §1.4 You are solely responsible for the information associated with your
        Account and anything happens related to your Account.
        <br /> <br /> §1.5 You will not license, sell, or transfer your Account
        without our prior written approval. <br /> <br />
        §1.6 You retain any ownership rights you have in your content, but you
        grant Social-Forum the following license to use/own that content.
        <br /> <br /> §1.7 As a user you have the rights to remove your Account
        by any time. But we will still grant the authority of your content, but
        you will NOT be associated with the posts or comments. <br /> <br />
        §1.8 Post-Moderator’s have the same rights/responsibilities as any other
        user of the community. <br /> <br />
        §1.9 Administrator’s have full permission to ban your Account if they
        suspect any inappropriate behavior.
      </StyledText>
      <StyledButton onClick={() => setReadMore(false)}>Back</StyledButton>
    </StyledWrapper>
  );
}

export default Terms;
