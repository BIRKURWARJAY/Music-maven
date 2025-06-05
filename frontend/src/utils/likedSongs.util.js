import axios from "axios";

export const removeLikedSong = async (songId) => {
    try {
        const res = await axios.post("/api/removeLikedSong", { songId });
        if(res.status === 200){
            console.log("Liked song removed successfully:")
        }
    } catch (error) {
        console.error("Error removing liked song:", error);        
    }
}


export const addLikedSong = async (song, songDuration) => {
    try {
        const { songId, name, artist, imageUrl, artistId } = song;
        const res = await axios.post("/api/addLikedSong", {
            songId, 
            name,
            songDuration,
            artist,
            imageUrl,
            artistId
        })

        if(res.status === 201){
            console.log("Liked song added successfully:");
        }
    } catch (error) {
        console.error("Error adding liked song:", error);
    }
}


export const deleteLikedSongs = async () => {
    try {
        const res = await axios.post("/api/deleteLikedSong");
        if(res.status === 200){
            console.log("Liked songs deleted successfully:");
        }
    } catch (error) {
        console.error("Error deleting liked songs:", error);
    }
}

export const getLikedSongs = async (song, setIsChecked) => {
    try {
        const res = await axios.get("/api/getLikedSongs");
        if(res.status === 200){
            const likedSongs = res.data.likedSongs;
            setIsChecked(likedSongs.some((likedSong) => likedSong.songId === song.songId));
            console.log("Liked songs fetched successfully:");
        }
    } catch (error) {
        console.error("Error fetching liked songs:", error);
    }
}