import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
	{
		userClerkId: { type: String },
		category: {
			type: String,
			enum: [
				'Entertainment',
				'Bills',
				'Groceries',
				'Dining Out',
				'Transportation',
				'Personal Care',
				'Education',
				'Lifestyle',
				'Shopping',
				'General',
			],
		},
		maximum: { type: Number },
		theme: { type: String },
	},
	{
		timestamps: true,
	},
);

export default mongoose.models.Budget || mongoose.model('Budget', budgetSchema);
