import AnimationLecteur from "./AnimationLecteur";
import ChansonsSuivantes from "./ChansonsSuivantes";
import SliderPlaybarFull from "./SliderPlaybarFull";

const PlaybarFull = ({ children }) => {

  return (
    <div className="playbarfull">
      <div className="playbarfull__inner">
        {children}
        <section className="infoChanson">
          {/* Redirection album */}
          <h2 className="titreChanson">Titre</h2>
          {/* redirection découvert artiste */}
          <h2 className="artisteChanson">Artiste</h2>
        </section>
        <ChansonsSuivantes />
        <SliderPlaybarFull />
        <AnimationLecteur />
        <div className="temps">
          <span>0:00</span>
          <span>0:30</span>
        </div>
      </div>
    </div>
  );
};

export default PlaybarFull;
