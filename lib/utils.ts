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

const getDueDate = (dayOfMonth: number) => {
	const now = new Date();
	return new Date(now.getFullYear(), now.getMonth(), dayOfMonth);
};

export const getBillStatus = (bill: BillProps) => {
	const due = getDueDate(bill.dayOfMonth);
	const now = new Date();
	const daysUntilDue = Math.ceil(
		(due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
	);

	if (bill.status === 'paid') return 'paid';
	if (daysUntilDue < 0) return 'overdue';
	if (daysUntilDue <= 3) return 'due soon';
	return 'pending';
};

export function addOrdinalSuffix(day: number) {
	if (day > 3 && day < 21) return day + 'th';

	switch (day % 10) {
		case 1:
			return day + 'st';
		case 2:
			return day + 'nd';
		case 3:
			return day + 'rd';
		default:
			return day + 'th';
	}
}
