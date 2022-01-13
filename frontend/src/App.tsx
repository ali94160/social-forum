import Nav from "./components/nav/Nav";
import AuthModal from "./components/auth-modal/AuthModal";
import AllRoutes from "./router/AllRoutes";

function App() {
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <AllRoutes>
          <AuthModal />
        </AllRoutes>
      </main>
    </div>
  );
}

export default App;
