import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer/Footer";

const Layout = () => {
  return (
    <div className="interfacedeux interface">
      <Nav />

      <main>
        <Outlet />
      </main>
      <Footer classe={"loginfooter"}/>
    </div>
  );
};

export default Layout;
