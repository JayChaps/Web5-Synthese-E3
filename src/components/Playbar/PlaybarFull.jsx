import AnimationLecteur from "./AnimationLecteur";

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
        <section className="animationLecteur">
          <AnimationLecteur />
        </section>
      </div>
    </div>
  );
};

export default PlaybarFull;
