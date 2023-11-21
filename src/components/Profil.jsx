import { useAuth } from '../context/auhContext';
import Playlist from '../pages/Playlist';


const Profil = () => {
    const { user } = useAuth();
    const userName = user?.displayName || 'No name available';

  
    return (
      <div>
        <h1>{userName}</h1>
        <h2>{user.email}</h2>
        <Playlist/>
        <h2>Chansons aimées : </h2>
        <div>
            <h2>Vos thèmes : </h2>
            <select name="theme" id="theme">
            <option value="theme1">theme1</option>
            <option value="theme2">theme2</option>
        </select>
        </div>
        
      </div>
    );
};

export default Profil;