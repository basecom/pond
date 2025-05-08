/**
 * Use it to create simple modal controllers
 */
export function useModal(lockModal: boolean = true) {
    // If used as a controller for a SharedModal, pass lockModal = false
    //  Otherwise both the composable and the radix modal will apply styles to lock the screen, leading to potential issues on some devices
    const isOpen = ref(false);
    const isLocked = lockModal ? useScrollLock(document?.body) : ref(false);

    const open = () => {
        isOpen.value = true;
        isLocked.value = lockModal;
    };

    const close = () => {
        isOpen.value = false;
        isLocked.value = false;
    };

    return {
        isOpen: computed(() => isOpen.value),
        open,
        close,
    };
}
