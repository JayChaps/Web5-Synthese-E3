import React, { useEffect } from 'react';
import { useAudioVisual } from '../context/audiotim';
import { motion, useAnimation } from 'framer-motion';

const AnimatedCircle = ({ songInfo }) => {
  const controls = useAnimation();
  const visualInfos = useAudioVisual();

  useEffect(() => {
    controls.start({
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 20,
        ease: "linear",
      },
    });
  }, [controls]);

  
  useEffect(() => {
    let hue = 0;

    const changeBorderColor = () => { // change la couleur au 2 secondes
      hue = (hue + 45) % 360; 
      controls.start({
        borderColor: `hsl(${hue}, 100%, 50%)`,
        transition: { duration: 2, ease: "easeInOut" },
      });
    };

    const intervalId = setInterval(changeBorderColor, 2000);

    return () => clearInterval(intervalId);
  }, [controls]);
//   useEffect(() => {                                 si on veux que la couleur du cercle change selon l'intensite
//     if (visualInfos.length > 0) {
//       
//       const maxIntensity = Math.max(...visualInfos);
//       
//       const intensityScale = maxIntensity / 255;

//
//       const borderColor = `hsl(${Math.round(360 * intensityScale)}, 100%, 50%)`;

//       
//       const size = Math.max(0.5, intensityScale * 1); 

//       controls.start({
//         borderColor: borderColor,
//         scale: size,
//         transition: { 
//           borderColor: {
//             duration: 0.5, 
//             ease: 'easeOut'
//           },
//           scale: {
//             type: 'spring', 
//             stiffness: 100, 
//             damping: 10 
//           }
//         },
//       });
//     }
//   }, [visualInfos, controls]);

 
  useEffect(() => {
    if (visualInfos.length > 0) {
      const maxIntensity = Math.max(...visualInfos);
      const size = Math.max(0.5, (maxIntensity / 255) * 1); 

      controls.start({
        scale: size,
        transition: { duration: 0.5 },
      });
    }
  }, [visualInfos, controls]);

  return (
    <motion.div
      animate={controls}
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '5px solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <img
        src={songInfo.coverUrl}
        alt="Song cover"
        style={{
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    </motion.div>
  );
};

export default AnimatedCircle;
