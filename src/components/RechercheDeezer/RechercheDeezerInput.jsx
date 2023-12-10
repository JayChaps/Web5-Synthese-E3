import React from "react";
import { IoIosSearch } from "react-icons/io";
const RechercheDeezerInput = ({ value, handleInputChange, handleSearch, autoFocus, placeholder }) => {
  return (
    <div className="playlist__recherche">
      <div className="lesplaylists__playlist__recherche__inner">
        <IoIosSearch size={"2rem"} color="var(--noir)" />
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

export default RechercheDeezerInput;
