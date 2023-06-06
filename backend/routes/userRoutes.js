import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

// Uploading profile image
// MULTER main function
import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single('image');

// Routers
userRouter.post('/signup', (req, res) => {
  // MULTER UPLOAD FUNCTION
  upload(req, res, async (err) => {
    // MULTER if else
    if (err) {
      console.log(err);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        // MULTER
        image: req.file.originalname,
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        // MULTER
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      // MULTER of else
    }
    // MULTER of upload
  });
});

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password === req.body.confirmPassword) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      } else {
        res.status(404).send({ message: 'Wrong password confirmation' });
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

export default userRouter;
