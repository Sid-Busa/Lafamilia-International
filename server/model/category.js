import mongoose from 'mongoose';
const { Schema } = mongoose;

const categoriesSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'Name must be required'],
	},
	imageUrl: {
		default: '',
		type: String,
		trim: true,
		required: [true, 'imageUrl must be required'],
	},
});

const categorys = mongoose.model('category', categoriesSchema);

export default categorys;
