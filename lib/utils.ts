import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function handleError(error: unknown) {
	const errorMessage = error instanceof Error ? error.message : 'An error occurred';
	toast.error(errorMessage);
}

export function capitalizeWords(value: string): string {
	return value.replace(/\b\w/g, (c) => c.toUpperCase());
}
