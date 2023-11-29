import AnimationLecteur from "./AnimationLecteur";
import ChansonsSuivantes from "./ChansonsSuivantes";

const PlaybarFull = () => {
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
      </div>
    </div>
  );
};

export default PlaybarFull;
