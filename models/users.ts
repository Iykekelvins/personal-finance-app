import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		clerkId: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.models.User || mongoose.model('User', userSchema);
