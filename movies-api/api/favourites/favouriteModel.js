import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const FavouriteSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String },
});

FavouriteSchema.statics.findByFavouriteDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Favourite', FavouriteSchema);
