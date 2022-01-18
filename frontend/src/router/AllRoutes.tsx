import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDetailPage from "../pages/post/PostDetail";
import CreatePost from "../pages/create-post/CreatePost";
import Home from "../pages/home/Home";
import MyPost from "../pages/my-posts/MyPosts";

interface Props {
  children: JSX.Element[];
}

const AllRoutes = ({ children }: Props) => {
  return (
    <Router>
      {children}
      <main>
        <Switch>
          <Route exact path="/create-post" component={CreatePost} />
          <Route path="/posts/:id" exact={true} component={PostDetailPage} />
          <Route path="/my-posts" exact={true} component={MyPost} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </Router>
  );
};

export default AllRoutes;
