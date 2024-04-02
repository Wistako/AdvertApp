const fs = require('fs');
const User = require('../models/User.model');
const Session = require('../models/Session.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {

  try {
    const  { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if( login && typeof login === 'string' &&
      password && typeof password === 'string' && 
      phone && typeof phone === 'string' && phone.length === 9 &&
      ['image/png', 'image/gif', 'image/jpeg'].includes(fileType)){

      const userWithLogin = await User.findOne({ login });
      if(userWithLogin){
        fs.unlinkSync(req.file.path);
        return res.status(409).send({ message: 'User with this login already exists' });
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        phone,
        avatar: req.file.filename
      });
      res.status(201).send({message: 'User created ' + user.login});
    } else {
      res.status(400).send({ message: 'Invalid data' });
      fs.unlinkSync(req.file.path);
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }

};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if( login && typeof login === 'string' && password && typeof password === 'string'){
      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).send({ message: 'Login or password are incorrect' });
      }
      else {
        if(bcrypt.compareSync(password, user.password)){
          req.session.user = {user : user.login, id: user._id };
          res.status(200).send({ message: 'Login successful', session: req.session });
        }
        else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }

    }
    else {
      res.status(400).send({ message: 'Bad request' });
    }
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

};

exports.logout = async (req, res) => {
  if(process.env.NODE_ENV !== 'production'){
  req.session.destroy();
  res.status(200).send({ message: 'Logged out' });
  } else {
    await Session.deleteMany();
    res.status(200).send({ message: 'Logged out' });
  }
};

exports.getUser = (req, res) => {
  res.send(req.session.user);
};