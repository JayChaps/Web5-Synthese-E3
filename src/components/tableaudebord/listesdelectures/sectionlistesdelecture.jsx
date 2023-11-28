import React from "react";
import { Link } from "react-router-dom";
import ListesdeLecture from "../listesdelectures/listesdelecture";

const sectionlistesdelecture = () => {
  
    return (
        <section>
            <div>
                <h1 className="titre-listesdelecture">Mes listes de lecture</h1>

                <ListesdeLecture />
                <ListesdeLecture />
                <ListesdeLecture />
                <ListesdeLecture />
            </div>
        </section>
    );
  };


export default sectionlistesdelecture;