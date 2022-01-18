import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDetailPage from '../pages/post/PostDetailPage';
import CreatePost from "../pages/create-post/CreatePost";
import Home from "../pages/home/Home";

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
          <Route exact path="/posts/:id" component={PostDetailPage} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
    </Router>
  );
};

export default AllRoutes;
