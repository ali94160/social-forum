import DropDownContextProvider from "./DropDownContext";
import ModalContextProvider from "./ModalContext";
import AuthContextProvider from "./AuthContext";
import UserContextProvider from "./UserContext";
import PostContextProvider from "./PostContext";
import CommentContextProvider from "./CommentContext";
import CategoryContextProvider from "./CategoryContext";

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
              <CategoryContextProvider>
                <CommentContextProvider>
                  <ModalContextProvider>{children}</ModalContextProvider>
                </CommentContextProvider>
              </CategoryContextProvider>
            </UserContextProvider>
          </DropDownContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default AllContexts;
