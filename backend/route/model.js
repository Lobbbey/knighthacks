const express = require('express');
const Media = require('../models/Media');
const User = require('../models/User');
const router = express.Router();

// @route POST /api/media/add
// @desc Adds media to a user
// @in 
// @out Result Message
router.post('/add', async (req, res) => {w
  try{
    const {
      title,
      mediaType,
      creator,
      userId,
      formats,
      genre,
      releaseYear,
      userRating,
      isbn,
      pageCount,
      runTimeMinutes,
      platform
    } = req.body;

    if(!title || !mediaType || !creator || !userId){
      return res.status(400).json({ message: "Missing required fields"});
    }

    const user = await User.findById(userId);
    if(!user){
     return res.status(404).json({ message: "User not found"}); 
    }

    const media = new Media({
      title,
      mediaType,
      creator,
      user: userId,
      formats,
      genre,
      releaseYear,
      userRating,
      isbn,
      pageCount,
      runTimeMinutes,
      platform,
    });

    await media.save();
    res.status(200).json({ message: "Media added successfully", media});

  } catch(err){
    console.error("Error:", err);
    res.status(500).json({Result: err.message});
  }
});

// @route POST /api/media/delete
// @desc Adds media to a user
// @in mediaID and userId
// @out Result Message
router.post('/delete', async (req, res) => {
  try{
    const { mediaId, userId } = req.body;

    if(!mediaId || !userId){
      return res.status(400).json({ message: "Missing mediaId or userId"});
    }

    const media = await Media.findById(mediaId);
    if(!media){
      return res.status(400).json({ message: "Entry not Found"});
    }

    if(media.user.toString() !== userId){
      return res.status(403).json({ message: "You do not have persmission to delete this entry"});
    }

    await Media.deleteOne({ _id: mediaId});
    res.status(200).json({ message: "media detleted successfully"});
  } catch(err){
    console.error("Error:", err);
    res.status(500).json({Result: err.message});
  }
});

// @route POST /api/media/search
// @desc Adds media to a user
// @in  search params
// @out search results
router.post('/search', async (req, res) =>{
  try{
    const { userId, mediaType, searchTerm } = req.body;

    if(!mediaType || !userId){
      return res.status(400).json({ message: "Missing required fields"});
    }

    const query = {
      user: userId,
      mediaType: mediaType,
    }

    if(searchTerm){
      const searchRegex = new RegExp(searchTerm, 'i');

      query.$or = [
        { title: searchRegex },
        { creator: searchRegex },
        { genre: searchRegex }
      ];
    }

    const results = await Media.find(query);

    res.status(200).json({ success: true, data: results});
  } catch(err){
    console.error("Error:", err);
    res.status(500).json({Result: err.message});
  }
});

// @route POST /api/media/Update
// @desc Adds media to a user
// @in updated information
// @out Result Message and list reload
router.post('/update', async (req, res) => {
  try{
    const {
      mediaId,
      title,
      mediaType,
      creator,
      userId,
      formats,
      genre,
      releaseYear,
      userRating,
      isbn,
      pageCount,
      runTimeMinutes,
      platform,
    } = req.body;

    if(!mediaId || !userId){
      return res.status(400).json({ message: "Missing required fields"});
    }

    const media = await Media.findById(mediaId);
    if(!media){
      return res.status(404).json({ message: "Media not found"});
    }
    
    if (title !== undefined) media.title = title;
    if (mediaType !== undefined) media.mediaType = mediaType;
    if (creator !== undefined) media.creator = creator;
    if (formats !== undefined) media.formats = formats;
    if (genre !== undefined) media.genre = genre;
    if (releaseYear !== undefined) media.releaseYear = releaseYear;
    if (userRating !== undefined) media.userRating = userRating;
    if (isbn !== undefined) media.isbn = isbn;
    if (pageCount !== undefined) media.pageCount = pageCount;
    if (runTimeMinutes !== undefined) media.runTimeMinutes = runTimeMinutes;
    if (platform !== undefined) media.platform = platform;

    await media.save();
    res.status(200).json({ message: "Media updated successfully"});
  } catch(err){
    console.error("Error:", err);
    res.status(500).json({Result: err.message});
  }
});

module.exports = router;