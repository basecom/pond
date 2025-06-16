export function usePondAuthentication() {
    const customerStore = useCustomerStore();
    const { signedIn, loading } = storeToRefs(customerStore);
    const { formatLink } = useInternationalization();

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        await sessionContextLoaded();
        if (!signedIn.value) {
            navigateTo(formatLink(targetRoute));
        }
    };

    const rerouteIfLoggedIn = async (targetRoute: string = '/account') => {
        await sessionContextLoaded();
        if (signedIn.value) {
            navigateTo(formatLink(targetRoute));
        }
    };

    const sessionContextLoaded = async () => {
        if (loading.value) {
            await until(loading).toBe(false);
        }
    };

    return {
        rerouteIfLoggedOut,
        rerouteIfLoggedIn,
    };
}
