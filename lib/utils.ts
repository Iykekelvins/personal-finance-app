import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { THEMES } from './constants';

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

export function getThemeColor(color: string) {
	return THEMES.find((t) => t.name === color)?.color;
}

export function formatDate(date: Date | string) {
	return new Date(date).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
}

export function formatAmount(amount: number) {
	return `${amount.toLocaleString()}.${amount.toFixed(2).slice(-2)}`;
}
