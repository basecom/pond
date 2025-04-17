export function usePondAuthentication() {
    const customerStore = useCustomerStore();
    const { signedIn, loading } = storeToRefs(customerStore);
    const { formatLink } = useInternationalization();

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        await sessionContextLoaded();
        console.log('signedIn', signedIn.value)
        if (!signedIn.value) {
            console.log('lets reroute')
            //navigateTo(formatLink(targetRoute));
        }
    };

    const sessionContextLoaded = async () => {
        if (loading.value) {
            await until(loading).toBe(false);
        }
    };

    return {
        rerouteIfLoggedOut,
    };
}
