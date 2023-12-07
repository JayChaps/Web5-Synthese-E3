import React from "react";


import TitreAcceuil from "../PageAcceuil/titreacceuil";
import CoucheInfo1 from "../PageAcceuil/couche-acceuil-info";
import DeuxiemeTitreAcceuil from "../PageAcceuil/deuxiemetitreacceuil";
import PetitsPoints from "../petitspoints";


const Acceuil = () => {
  
  return (
    <div>
        <TitreAcceuil/>
        <CoucheInfo1/>
        <PetitsPoints/>
        <DeuxiemeTitreAcceuil/>
    </div>
  );
};

export default Acceuil;
