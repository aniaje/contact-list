import { useEffect } from 'react';

export function useScrollTo(elementId: string, trigger: boolean) {
    useEffect(() => {
        if (trigger) {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [elementId, trigger]);
}
