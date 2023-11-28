import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/scss/components/tableaudebord/propositionchansons.scss"
import { FaPlayCircle } from "react-icons/fa";


const propositionchansons = () => {
  
    return (
      <section className="propositionchansons">
        <FaPlayCircle
                    size={"2rem"}
                    color="var(--noir)"
        />
        <h2>proposition</h2>
      </section>
    );
  };


export default propositionchansons;