import mongoose from 'mongoose';

const billSchema = new mongoose.Schema(
	{
		userClerkId: { type: String },
		title: { type: String },
		avatar: { type: String },
		amount: { type: Number },
		dayOfMonth: { type: Number },
		status: { type: String, enum: ['paid', 'pending', 'overdue'] },
	},
	{
		timestamps: true,
	},
);
export default mongoose.models.Bill || mongoose.model('Bill', billSchema);
