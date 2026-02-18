'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import WalletTopup from '@/components/modals/wallet-topup';

export default function AddMoney() {
	const [openModal, setOpenModal] = useState(false);

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogTrigger asChild>
				<Button>+Top-up Wallet</Button>
			</DialogTrigger>
			<WalletTopup onClose={() => setOpenModal(false)} />
		</Dialog>
	);
}
