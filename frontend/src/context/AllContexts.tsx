import DropDownContextProvider from "./DropDownContext";
import ModalContextProvider from "./ModalContext";
import AuthContextProvider from "./AuthContext";
import UserContextProvider from "./UserContext";
import PostContextProvider from "./PostContext";
import CommentContextProvider from "./CommentContext";
import BanContextProvider from "./BanContext";

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
                <BanContextProvider>
                  <ModalContextProvider>{children}</ModalContextProvider>
                </BanContextProvider>
              </CommentContextProvider>
            </UserContextProvider>
          </DropDownContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default AllContexts;
