import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Playbar from "./Playbar/Playbar";
import { SongInfoProvider } from "../context/SongInfoContext";

const LayoutAuth = () => {
  return (
    <SongInfoProvider>
      <div className="interface">
        <Nav />

        <main>
          <Outlet />
          <Playbar />
        </main>
      </div>
    </SongInfoProvider>
  );
};

export default LayoutAuth;
