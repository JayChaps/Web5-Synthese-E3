import React from "react";
import { IoIosSearch } from "react-icons/io";
import { CgAdd } from "react-icons/cg";
const RechercheDeezerInput = ({ value, handleInputChange, autoFocus, placeholder, icone, action }) => {
  return (
    <div className="playlist__recherche">
      <div className="lesplaylists__playlist__recherche__inner">

        {
          icone  === "add" && <CgAdd size={"2rem"} color="var(--noir)" onClick={action}/>
        }
        {
          icone  === "search" && <IoIosSearch size={"2rem"} color="var(--noir)" />
        }
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
