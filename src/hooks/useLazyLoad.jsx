import { useState, useEffect, useRef } from 'react';

export function useLazyLoad() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasLoaded) {
                setIsVisible(true);
                setHasLoaded(true); // Load 1 lần duy nhất
            }
        }, {
            threshold: 0.1,
            rootMargin: '100px', // Load trước 100px
        });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasLoaded]);

    return [ref, isVisible, hasLoaded];
};
