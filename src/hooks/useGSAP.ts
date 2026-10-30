'use client';

import { useEffect, useRef, DependencyList } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP(
    callback: (ctx: gsap.Context) => void,
    deps: DependencyList = []
) {
    const ctxRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        ctxRef.current = gsap.context(() => {
            callback(ctxRef.current!);
        });

        return () => {
            ctxRef.current?.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return ctxRef;
}
