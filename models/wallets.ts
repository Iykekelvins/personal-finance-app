import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
	userClerkId: { type: String },
	balance: { type: Number, default: 0 },
	expenses: { type: Number, default: 0 },
});

export default mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);
