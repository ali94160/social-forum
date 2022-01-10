import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const AllRoutes = ({ children }: Props) => {
  return (
    <Router>
      {children}
      <Switch></Switch>
    </Router>
  );
};

export default AllRoutes;
