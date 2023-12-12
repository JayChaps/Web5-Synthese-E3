import ChansonSuivante from "./ChansonSuivante";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { useEffect, useState } from "react";
const ChansonsSuivantes = () => {
  const settings = {
    slidesToShow: 3,
    draggable: true,
  };
  return (
    <section className="chansonssuivantes">
      <Glider {...settings}>
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
        <ChansonSuivante />
      </Glider>
    </section>
  );
};

export default ChansonsSuivantes;
