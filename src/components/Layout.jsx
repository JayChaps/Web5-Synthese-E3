import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div className="interface">
      <Nav />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
