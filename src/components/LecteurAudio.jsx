import React, { useEffect } from "react";
import { useAudio } from "../context/audiotim"; // Importez le contexte audio

const LecteurAudio = () => {
    const {
        play, // Fonction de lecture
        pause, // Fonction de pause
        isPaused, // Vérifiez si la lecture est en pause
        changeSource, // Changez la source audio
        isReady, // Vérifiez si le lecteur audio est prêt
        stop, // Fonction d'arrêt
        togglePause, // Fonction de basculement de pause
        duration, // Durée de la chanson
        volume, // Volume actuel
        changeVolume // Fonction de changement de volume
    } = useAudio();

    useEffect(() => {
        // Chargez la première chanson lorsque le composant est monté (vous pouvez le personnaliser)
        if (isReady) {
            const initialSong = "URL_DE_VOTRE_PREMIERE_CHANSON";
            changeSource(initialSong);
        }
    }, [isReady, changeSource]);

    return (
        <div>
            {isReady && (
                <>
                    {isPaused ? (
                        <button onClick={play}>Lire</button>
                    ) : (
                        <button onClick={pause}>Pause</button>
                    )}
                </>
            )}
        </div>
    );
    
};

export default LecteurAudio;
