// Photo Schema and Model for Uploaded Photos

import { Schema, model, models } from 'mongoose';

// create Photo schema
const PhotoSchema = new Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  link: {
    type: String,
    required: [true, 'Link to an image is required.'],
  },
  hash: {
    type: String,
    required: [true, 'Hash is required.'],
  },
  title: {
    type: String,
    required: [true, 'Image title is required.'],
  },
  description: {
    type: String,
    required: [true, 'Image description is required.'],
  },
  cameraModel: {
    type: String,
  },
  uploadDate: {
    type: Date,
    default: () => Date.now(),
  },
});

// check if model already exist, else create new Photo model
const Photo = models.Photo || model('Photo', PhotoSchema);

export default Photo;
