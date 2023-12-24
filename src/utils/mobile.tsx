export function generateTouchHandlers<T extends HTMLElement>() {
    return {
        onTouchStart: (e: React.TouchEvent<T>) => e.currentTarget?.setAttribute("aria-pressed", "true"),

        onTouchEnd: (e: React.TouchEvent<T>) => e.currentTarget?.removeAttribute("aria-pressed")
    }
}