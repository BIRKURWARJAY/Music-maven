import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";


export const getLikedSongs = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.cookies.user}).populate("likedSongs");
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    const likedSongs = user.likedSongs;
    res.status(200).json({
        message: "Liked songs fetched successfully",
        likedSongs
    });
});


export const addLikedSong = asyncHandler(async (req, res) => {
    const { songId, name, artist, imageUrl, songDuration, artistId } = req.body;

    if (!songId || !name || !artist || !imageUrl || !songDuration || !artistId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOneAndUpdate({ _id: req.cookies.user }, {
        $addToSet: {
            likedSongs: {
                songId,
                name,
                artist,
                imageUrl,
                songDuration,
                artistId
            }
        }
    }, { new: true });
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({
        message: "Song added to liked songs successfully",
    });
});


export const removeLikedSong = asyncHandler(async (req, res) => {
    const { songId } = req.body;

    if (!songId) {
        return res.status(400).json({ message: "Song ID is required" });
    }

    const user = await User.findOneAndUpdate({ _id: req.cookies.user }, 
        { $pull: { likedSongs: { songId } } },  
        { new: true }
    );
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        message: "Song removed from liked songs successfully",
    });
});

export const deleteLikedSong = asyncHandler(async (req, res) => {

    const user = await User.findOneAndUpdate(
        { _id: req.cookies.user },  
        { $set: { likedSongs: [] } },  
        { new: true }   
    );
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        message: "Song removed from liked songs successfully",
    });
});
