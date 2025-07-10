export function useAuthentication() {
    const customerStore = useCustomerStore();
    const { signedIn, loading } = storeToRefs(customerStore);

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        await sessionContextLoaded();
        if (!signedIn.value) {
            navigateTo(targetRoute);
        }
    };

    const rerouteIfLoggedIn = async (targetRoute: string = '/account') => {
        await sessionContextLoaded();
        if (signedIn.value) {
            navigateTo(targetRoute);
        }
    };

    const sessionContextLoaded = async () => {
        if (loading.value) {
            await until(loading).toBe(false);
        }
    };

    return {
        rerouteIfLoggedIn,
        rerouteIfLoggedOut,
    };
}
