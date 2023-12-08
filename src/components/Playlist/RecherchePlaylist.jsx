import React from "react";
import { IoIosSearch } from "react-icons/io";
import { CgAdd } from "react-icons/cg";
const RecherchePlaylist = () => {
  return (
    <div className="playlist__recherche">
      <div className="lesplaylists__playlist__recherche__inner">
        <IoIosSearch size={"3rem"} color="var(--noir)" />
        <input type="text" />
        <CgAdd size={"3rem"} color="var(--noir)" />
      </div>
    </div>
  );
};

export default RecherchePlaylist;
