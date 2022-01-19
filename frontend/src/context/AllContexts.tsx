import DropDownContextProvider from "./DropDownContext";
import ModalContextProvider from "./ModalContext";
import AuthContextProvider from "./AuthContext";
import UserContextProvider from "./UserContext";
import PostContextProvider from "./PostContext";
import CommentContextProvider from "./CommentContext";

interface Props {
  children: JSX.Element;
}

function AllContexts({ children }: Props) {
  return (
    <>
      <AuthContextProvider>
        <PostContextProvider>
          <DropDownContextProvider>
            <UserContextProvider>
              <CommentContextProvider>
                <ModalContextProvider>{children}</ModalContextProvider>
              </CommentContextProvider>
            </UserContextProvider>
          </DropDownContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default AllContexts;
