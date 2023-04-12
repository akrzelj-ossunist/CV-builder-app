import { useRoutes, useLocation, Link } from "react-router-dom";
import PresonalInfo from "./components/PersonalInfo";
import About from "./components/About";
import Projects from "./components/Projects";
import "./styles/index.scss";
import SideBgImage from "./assets/SideBgImage";

function App() {
  const location = useLocation();
  const routes = useRoutes([
    {
      path: "/",
      element: <PresonalInfo />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/projects",
      element: <Projects />,
    },
    {
      path: "*",
      element: <div>Not found</div>,
    },
  ]);

  return (
    <div className="container">
      <div className="content">
        <div className="side-nav">
          <div className="side-nav-btns">
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "side-nav-btn btn-active"
                  : "side-nav-btn"
              }
            >
              <label>1</label>
              <p>Personal info</p>
            </Link>
            <Link
              to="/about"
              className={
                location.pathname === "/about"
                  ? "side-nav-btn btn-active"
                  : "side-nav-btn"
              }
            >
              <label>2</label>
              <p>About</p>
            </Link>
            <Link
              to="/projects"
              className={
                location.pathname === "/projects"
                  ? "side-nav-btn btn-active"
                  : "side-nav-btn"
              }
            >
              <label>3</label>
              <p>Projects</p>
            </Link>
          </div>
          <SideBgImage />
        </div>

        {routes}
      </div>
    </div>
  );
}

export default App;
