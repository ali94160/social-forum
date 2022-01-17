import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDetailPage from '../pages/post/PostDetailPage';

interface Props {
  children: JSX.Element;
}

const AllRoutes = ({ children }: Props) => {
  return (
    <Router>
      {children}
      <Switch>
        <Route path="/posts/:id" exact={true} component={PostDetailPage} />
      </Switch>
    </Router>
  );
};

export default AllRoutes;
