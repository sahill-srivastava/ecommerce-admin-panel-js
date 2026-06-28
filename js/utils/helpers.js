// import { appContent } from "./refs.js";
import { items } from "./refs.js";


export function handleIconHover() {
    items.forEach(item => {
        const icon = item.querySelector('lord-icon');

        item.addEventListener('mouseenter', () => {
            icon.setAttribute("trigger", "in");
        });

    });
}


