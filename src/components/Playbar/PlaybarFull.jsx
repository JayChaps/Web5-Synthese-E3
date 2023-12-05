import AnimationLecteur from "./AnimationLecteur";
import ChansonsSuivantes from "./ChansonsSuivantes";
import SliderPlaybarFull from "./SliderPlaybarFull";

const PlaybarFull = ({ songInfo, progress, duration }) => {
  const urlImg = "src/assets/img/jpg/placeholder.jpg";
  return (
    <div className="playbarfull">
      <div className="playbarfull__inner">
        <section className="infoChanson">
          {/* Redirection album */}
          <h2 className="titreChanson">Titre</h2>
          {/* redirection découvert artiste */}
          <h2 className="artisteChanson">Album</h2>
        </section>
        <AnimationLecteur />
        <ChansonsSuivantes />
        <SliderPlaybarFull progress={progress} duration={duration} />

        <div className="cover">
          <img src={urlImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PlaybarFull;
