import { CATEGORIES } from '@/lib/constants';
import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
	{
		userClerkId: { type: String },
		category: {
			type: String,
			enum: CATEGORIES,
		},
		maximum: { type: Number },
		theme: { type: String },
	},
	{
		timestamps: true,
	},
);

export default mongoose.models.Budget || mongoose.model('Budget', budgetSchema);
