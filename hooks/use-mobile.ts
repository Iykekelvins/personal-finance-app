import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener('change', onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener('change', onChange);
	}, []);

	return !!isMobile;
}

export function useIsTablet() {
	const [isTablet, setIsTablet] = React.useState(() => {
		if (typeof window === 'undefined') return false;
		return window.innerWidth <= 1220 && window.innerWidth > 768;
	});

	React.useEffect(() => {
		const handleResize = () => {
			setIsTablet(window.innerWidth <= 1220 && window.innerWidth > 768);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isTablet;
}
