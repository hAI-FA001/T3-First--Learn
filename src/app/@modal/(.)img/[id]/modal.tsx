'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Button } from '~/components/ui/button';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return createPortal(
        <dialog ref={dialogRef} className="relative h-screen w-screen bg-black/90 m-0 text-white" onClose={onDismiss}>
            <Button onClick={onDismiss} className="close-button absolute top-0 right-0" variant="destructive">X</Button>
            {children}
        </dialog>,
        document.getElementById('modal-root')!
    );
}