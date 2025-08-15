export function usePondAuthentication() {
    const customerStore = useCustomerStore();
    const { signedIn, loading } = storeToRefs(customerStore);
    const { formatLink } = useInternationalization();
    const { toast } = usePondToast();
    const { t } = useI18n();
    const { handleError } = usePondHandleError();

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        await sessionContextLoaded();
        if (!signedIn.value) {
            navigateTo(formatLink(targetRoute));
        }
    };

    const rerouteIfLoggedIn = async (targetRoute: string = '/account') => {
        await sessionContextLoaded();

        // The customer can log in via modal and be on the login page at the same time. The watcher is required to handle the case.
        watch(
            () => signedIn.value,
            (isSignedIn) => {
                if (!isSignedIn) return;
                navigateTo(formatLink(targetRoute));
            },
            { immediate: true },
        );
    };

    const sessionContextLoaded = async () => {
        if (loading.value) {
            await until(loading).toBe(false);
        }
    };

    const logout = async (redirectTo: string = '/') => {
        try {
            await navigateTo(formatLink(redirectTo));
            await customerStore.logout();
            toast({
                title: t('account.logoutSucceeded'),
            });
        } catch (error) {
            handleError(error);
        }
    };

    return {
        rerouteIfLoggedOut,
        rerouteIfLoggedIn,
        logout,
    };
}
