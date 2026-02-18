import { CATEGORIES } from '@/lib/constants';
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
	{
		userClerkId: { type: String },
		name: { type: String },
		avatar: { type: String },
		category: { type: String, enum: [...CATEGORIES, 'Savings'] },
		amount: { type: Number },
	},
	{
		timestamps: true,
	},
);

export default mongoose.models.Transaction ||
	mongoose.model('Transaction', transactionSchema);
