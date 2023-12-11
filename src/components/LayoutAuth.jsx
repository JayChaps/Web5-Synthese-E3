import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Playbar from "./Playbar/Playbar";
import { SongInfoProvider } from "../context/SongInfoContext";
import Footer from "./footer/footer";

const LayoutAuth = () => {
  return (
    <SongInfoProvider>
      <div className="interface">
        <Nav />

        <main>
          <Outlet />
          <Playbar />
        </main>

        <Footer />
      </div>
    </SongInfoProvider>
  );
};

export default LayoutAuth;
