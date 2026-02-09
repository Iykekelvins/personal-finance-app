import mongoose from 'mongoose';

const potSchema = new mongoose.Schema(
	{
		userClerkId: { type: String },
		name: { type: String },
		target: { type: Number },
		total: { type: Number },
		theme: { type: String },
	},
	{
		timestamps: true,
	},
);

export default mongoose.models.Pot || mongoose.model('Pot', potSchema);
