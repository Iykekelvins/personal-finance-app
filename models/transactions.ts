import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
	{
		userClerkId: { type: String },
		name: { type: String },
		amount: { type: Number },
		category: { type: String },
		isRecurring: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	},
);

export default mongoose.models.Transaction ||
	mongoose.model('Transaction', transactionSchema);
