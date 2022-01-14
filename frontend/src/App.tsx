import Nav from "./components/nav/Nav";
import AuthModal from "./components/auth-modal/AuthModal";
import AllRoutes from "./router/AllRoutes";

function App() {
  return (
    <div className="App">
      <AllRoutes>
        <header>
          <Nav />
        </header>
        <AuthModal />
      </AllRoutes>
    </div>
  );
}

export default App;
