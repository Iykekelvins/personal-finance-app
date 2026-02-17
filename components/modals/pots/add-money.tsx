import {
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { capitalizeWords, getThemeColor } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	amount: z.number().min(1, { message: "can't be empty" }),
});

export default function AddMoney({ pot }: { pot: PotProps }) {
	const color = getThemeColor(pot.theme);
	const totalSaved = ((pot?.total as number) / pot.target) * 100;

	return (
		<DialogContent>
			<DialogTitle>Add to ‘{capitalizeWords(pot.name)}’</DialogTitle>
			<DialogDescription>
				Add money to your pot to keep it separate from your main balance. As soon as
				you add this money, it will be deducted from your current balance.
			</DialogDescription>

			<div className='mt-[14.5px]'>
				<div className='flex items-center justify-between'>
					<p className='text-preset-4 text-grey-500'>New Amount</p>
					<h3 className='text-grey-900 font-bold text-preset-1'>
						${(pot?.total as number).toFixed(2)}
					</h3>
				</div>
			</div>

			<div>
				<div className='relative h-2 rounded-full bg-beige-100 overflow-hidden'>
					<div className='flex items-center gap-[2px] absolute top-0 left-0 h-full w-full'>
						<div
							className='rounded-l-full h-full bg-grey-900'
							style={{
								width: `${totalSaved}%`,
							}}
						/>
					</div>
				</div>
				<div className='flex items-center justify-between mt-3.25'>
					<p className='text-preset-5 text-grey-500 font-bold'>
						{/* {totalSaved.toFixed(2)}% */}
					</p>
					<p className='text-preset-5 text-grey-500'>
						Target of ${pot.target.toLocaleString()}
					</p>
				</div>
			</div>
		</DialogContent>
	);
}
