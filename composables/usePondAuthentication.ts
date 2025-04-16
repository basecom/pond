export function usePondAuthentication() {
    const { signedIn, loading } = storeToRefs(useCustomerStore());
    const { formatLink } = useInternationalization();

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        console.log('start reroute')
        await sessionContextLoaded();
        console.log('isloading', !signedIn.value)
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
