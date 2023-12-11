import React from "react";
import { CgAdd } from "react-icons/cg";
const CreerPlaylistInput = ({ value, handleInputChange, action, autoFocus, placeholder }) => {
  return (
    <div className="playlist__recherche">
      <div className="lesplaylists__playlist__recherche__inner">
        <CgAdd size={"2rem"} color="var(--noir)" onClick={action}/>
        <div>
          <input type="text" value={value} onChange={handleInputChange}
            autoFocus={autoFocus} 
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default CreerPlaylistInput;
