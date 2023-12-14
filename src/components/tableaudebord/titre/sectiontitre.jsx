import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import PropositionChansons from "../titre/PropositionChansons";
import fetchJsonp from "fetch-jsonp";

const SectionTitre = () => {
  const [albumData, setAlbumData] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const iconVariants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: { opacity: 1, rotate: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.8, ease: 'easeInOut' } },
  };

  useEffect(() => {
    const getRandomAlbumId = () => {
      return Math.floor(Math.random() * 100000) + 1;
    };

    const fetchAlbumData = async () => {
      try {
        const randomAlbumId = getRandomAlbumId();
        const url = `https://api.deezer.com/album/${randomAlbumId}?output=jsonp`;
        const resp = await fetchJsonp(url);
        const data = await resp.json();
    
        // Check if the response contains valid data
        if (data && data.title && data.cover_big) {
          setAlbumData({ id: randomAlbumId, data });
        } else {
          console.error("Invalid data received:", data);
        }
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };

   
    fetchAlbumData();
  }, []);

  return (
    <motion.section className="containersectiontitre" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="content">
        
        <motion.FaPlayCircle size={"4rem"} color="var(--blanc)" className="play-icon" variants={iconVariants} />
        {albumData && (
          <>
            <motion.h1 className="titresectiontitre2" variants={titleVariants}>
              {albumData.data.title}
            </motion.h1>
            <motion.div className="small-image" variants={imageVariants}>
              <img src={albumData.data.cover_big} alt="cover" />
            </motion.div>
            <PropositionChansons albumId={albumData.id} />
          </>
        )}
      </motion.div>
    </motion.section>
  );
};

export default SectionTitre;
