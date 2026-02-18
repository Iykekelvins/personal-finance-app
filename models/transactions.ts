import { CATEGORIES } from '@/lib/constants';
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
	{
		userClerkId: { type: String },
		name: { type: String },
		avatar: { type: String },
		category: { type: String, enum: [...CATEGORIES, 'Savings', 'Top Up'] },
		amount: { type: Number },
	},
	{
		timestamps: true,
	},
);

transactionSchema.index({ userClerkId: 1, createdAt: 1 });

export default mongoose.models.Transaction ||
	mongoose.model('Transaction', transactionSchema);
