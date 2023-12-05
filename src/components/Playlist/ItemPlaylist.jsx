import React from 'react'
import { FaPlayCircle } from 'react-icons/fa';

const ItemPlaylist = () => {

    const urlImg = "src/assets/img/jpg/placeholder.jpg";
    return (
        <article className='itemplaylist'>
            <div className="wrapperitem">

                <h3>Nom Playlist</h3>
                <img src={urlImg} alt="" />
                <img src={urlImg} alt="" />
                <img src={urlImg} alt="" />
                <img src={urlImg} alt="" />
                <FaPlayCircle
                    size={"4rem"}
                    color="var(--noir)"
                />
            </div>
        </article>
    )
}

export default ItemPlaylist