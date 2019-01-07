import { createStore } from './store';
// import { TRIGGER_EVENTS, TRIGGER_KEYCODES } from './constants';
import { findTabsAndPanels, initUI, open } from './dom';
import { getActiveIndexByHash } from './utils';

/*
 * Dispatches a toggle action to the Store
 * 
 * @param Store, Object, model or state of the current instance
 */
const toggle = Store => () => {
    Store.dispatch({ isOpen: !Store.getState().isOpen }, [toggleAttributes, manageFocus(Store), closeOnBlur(Store)]);
};

/*
 * Partially applied function that returns a function that being sthe toggle lifecycle (prehook > toggle > callback)
 * 
 * @param Store, Object, model or state of the current instance
 * @returns Function
 */
const startToggleLifecycle = Store => () => {
    const { node, toggles, settings, isOpen, classTarget, animatingClass } = Store.getState();
    (settings.prehook && typeof settings.prehook === 'function') && settings.prehook({ node, toggles, isOpen });		
    classTarget.classList.add(animatingClass);
    const fn = () => {
        toggle(Store)();
        (!!settings.callback && typeof settings.callback === 'function') && settings.callback({ node, toggles, isOpen: Store.getState().isOpen });
    };
    if(isOpen && +settings.delay > 0) window.setTimeout(fn, +settings.delay);
    else fn();
};

/*
 * Sets aria attributes and adds eventListener on each toggle button
 * 
 * @param Store, Object, model or state of the current instance
//  */
// const initToggles = Store => {
//     const { toggles, node } = Store.getState();

//     toggles.forEach(toggle => {
//         if(toggle.tagName !== 'BUTTON') toggle.setAttribute('role', 'button');
//         const id = node.getAttribute('id');
//         if(!id) throw console.warn(`${node} should have an id.`);
//         toggle.setAttribute('aria-controls', id);
//         toggle.setAttribute('aria-expanded', 'false');
//         TRIGGER_EVENTS.forEach(ev => {
//             toggle.addEventListener(ev, e => {
//                 if(!!e.keyCode && !~TRIGGER_KEYCODES.indexOf(e.keyCode) || (e.which && e.which === 3)) return;
//                 e.preventDefault();
//                 startToggleLifecycle(Store)();
//             });
//         });
//     });
// };
/* 
 * @param settings, Object, merged defaults + options passed in as instantiation config to module default
 * @param node, HTMLElement, DOM node to be toggled
 *
 * @returns Object, Toggle API
 */
export default ({ node, settings }) => {
    const Store = createStore();
    const { tabs, panels } = findTabsAndPanels(node, settings);
    const activeIndex = getActiveIndexByHash(panels);
    Store.dispatch({
        settings,
        node,
        activeIndex: activeIndex !== undefined ? activeIndex : settings.activeIndex,
        tabs,
        panels
    }, [ initUI(Store), open ]);

    return { 
        node,
        getState: Store.getState
    }
}; 