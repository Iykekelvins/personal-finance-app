'use client';

import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { capitalizeWords } from '@/lib/utils';

export default function Withdraw({ pot }: { pot: PotProps }) {
	return (
		<DialogContent>
			<DialogTitle>Withdraw from ‘{capitalizeWords(pot.name)}’</DialogTitle>
		</DialogContent>
	);
}
