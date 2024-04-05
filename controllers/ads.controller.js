const fs = require('fs');
const path = require('path');
const Advert = require('../models/Advert.model');
const getImageFileType = require('../utils/getImageFileType');

// get all ads
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Advert.find().populate('user', '-password');
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get ad by id
exports.getAdById = async (req, res) => {
  try {
    const ad = await Advert.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create ad
exports.createAd = async (req, res) => {
  const { title, content, price, location } = req.body;
  const { id } = req.session.user;
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
  
  if(title && typeof title === 'string' &&
    content && typeof content === 'string' &&
    price && typeof price === 'string' &&
    location && typeof location === 'string' &&
    ['image/png', 'image/gif', 'image/jpeg'].includes(fileType)
  ) {
    const data = {
      title,
      content,
      price,
      location,
      user: id,
      image: req.file.filename
    }
    const ad = new Advert(data);
    try {
      const newAd = await ad.save();
      res.status(201).json(newAd);
    } catch (error) {
      fs.unlinkSync(req.file.path)
      res.status(400).json({ message: error.message });
    }
  } else {
    fs.unlinkSync(req.file.path)
    return res.status(400).json({ message: 'Invalid data' });
  }

};

// update ad
exports.updateAd = async (req, res) => {
  const { title, content, price, location } = req.body;
  if (!title || !content || !price || !location) {
    fs.unlinkSync(req.file.path)
    return res.status(400).json({ message: 'Invalid data' });
  }
  try {
    const ad = await Advert.findById(req.params.id).populate('user');
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (!ad) {
      fs.unlinkSync(req.file.path)
      return res.status(404).json({ message: 'Ad not found' });
    }
    // Jeśli użytkownik nie jest właścicielem ogłoszenia
    if(req.session.user.id != ad.user._id){
      fs.unlinkSync(req.file.path)
      return res.status(403).json({ message: 'Forbidden' });
    }
    if(['image/png', 'image/gif', 'image/jpeg'].includes(fileType)){
      fs.unlinkSync(path.join(__dirname, '../public/uploads/', ad.image));
      ad.image = req.file.filename;
    }
    ad.title = req.body.title;
    ad.content = req.body.content;
    ad.price = req.body.price;
    ad.location = req.body.location;
    ad.user = req.session.user.id;

    const updatedAd = await ad.save();
    res.json(updatedAd);
  } catch (error) {
    fs.unlinkSync(req.file.path)
    res.status(400).json({ message: error.message });
  }
};

// delete ad
exports.deleteAd = async (req, res) => {
  try {
    const ad = await Advert.findById(req.params.id).populate('user');
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    // Jeśli użytkownik nie jest właścicielem ogłoszenia
    if(req.session.user.id != ad.user._id){
      return res.status(403).json({ message: 'Forbidden', sessionId: req.session.user.id, adUserId: ad.user._id});
    }
    fs.unlinkSync(path.join(__dirname, '../public/uploads/', ad.image));
    await ad.deleteOne({ _id: req.params.id });
    res.json({ message: 'Ad deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// search ads
exports.searchAds = async (req, res) => {
  try {
    const ads = await Advert.find({
      $or: [
        { title: {$regex: req.params.searchPhrase, $options: 'i'} },
        { content: { $regex: req.params.searchPhrase, $options: 'i'} }
      ]
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};