import { useRef, useState } from 'react';

export const useDragScroll = () => {
    const refs = useRef(new Map());
    const [isMouseDown, setIsMouseDown] = useState(false);
    const mouseCoords = useRef({
        startX: 0,
        scrollLeft: 0,
    });

    const getRef = (key) => {
        if (!refs.current.has(key)) {
            refs.current.set(key, { current: null });
        }
        return refs.current.get(key);
    };

    const handleDragStart = (key, e) => {
        const ref = refs.current.get(key)?.current;
        if (!ref) return;
        const startX = e.pageX - ref.offsetLeft;
        const scrollLeft = ref.scrollLeft;
        mouseCoords.current = { startX, scrollLeft };
        setIsMouseDown(true);
        ref.style.cursor = "grabbing";
    };

    const handleDragEnd = (key) => {
        const ref = refs.current.get(key)?.current;
        setIsMouseDown(false);
        if (!ref) return;
        ref.style.cursor = "default";
    };

    const handleDrag = (key, e) => {
        const ref = refs.current.get(key)?.current;
        if (!isMouseDown || !ref) return;;
        e.preventDefault();
        const x = e.pageX - ref.offsetLeft;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        ref.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    };

    return {
        getRef,
        handleDragStart,
        handleDragEnd,
        handleDrag,
    };
};