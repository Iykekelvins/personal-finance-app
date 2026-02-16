import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Ellipsis } from 'lucide-react';
import { THEMES } from '@/lib/constants';
import PotOptions from './pot-options';

export default function Pot({ ...pot }: PotProps) {
	const color = THEMES.find((t) => t.name === pot.theme)?.color;

	return (
		<div className='bg-white rounded-150 p-300'>
			<div className='flex items-center justify-between'>
				<h2 className='flex items-center gap-200'>
					<span
						className='size-4 rounded-full'
						style={{
							backgroundColor: color,
						}}
					/>
					<span className='text-preset-2 font-bold'>{pot.name}</span>
				</h2>

				<Popover>
					<PopoverTrigger asChild>
						<button>
							<Ellipsis className='text-grey-300' />
						</button>
					</PopoverTrigger>
					<PotOptions pot={pot} />
				</Popover>
			</div>
		</div>
	);
}
