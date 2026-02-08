import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='grow flex'>
			<header
				className='flex items-center justify-center bg-grey-900 
			rounded-b-lg py-300 fixed top-0 left-0 w-full des:hidden'>
				<Image src='/logo.png' width={121.45} height={21.76} alt='finance logo' />
			</header>
			<div
				className='des:grid grid-cols-[0.4fr_0.6fr] w-full
			 max-[1190px]:place-content-center'>
				<div className='p-250 hidden des:block'>
					<div
						className='bg-[url(/auth-illustration.png)] 
					bg-cover bg-no-repeat h-full rounded-150 p-500
					flex flex-col justify-between bg-center
					'>
						<Image
							src='/logo.png'
							width={121.45}
							height={21.76}
							alt='finance logo'
						/>

						<div className='text-white'>
							<h1 className='text-preset-1 font-bold leading-[1.2] max-w-120'>
								Keep track of your money and save for your future
							</h1>
							<p className='mt-6 text-preset-4 leading-normal'>
								Personal finance app puts you in control of your spending. Track
								transactions, set budgets, and add to savings pots easily.
							</p>
						</div>
					</div>
				</div>
				<div
					className='flex items-center justify-center
					py-400 px-200 md:px-500 
					'>
					{children}
				</div>
			</div>
		</main>
	);
}
