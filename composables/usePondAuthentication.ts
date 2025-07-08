import { useToast } from '@/components/ui/toast/use-toast';

export function usePondAuthentication() {
    const customerStore = useCustomerStore();
    const { signedIn, loading } = storeToRefs(customerStore);
    const { formatLink } = useInternationalization();
    const { toast } = useToast();
    const { t } = useI18n();

    const rerouteIfLoggedOut = async (targetRoute: string = '/account/login') => {
        await sessionContextLoaded();
        if (!signedIn.value) {
            navigateTo(formatLink(targetRoute));
        }
    };

    const rerouteIfLoggedIn = async (targetRoute: string = '/account') => {
        await sessionContextLoaded();

        // The customer can log in via modal and be on the login page at the same time. The watcher is required to handle the case.
        const stop = watch(
            () => signedIn.value,
            (isSignedIn) => {
                if (!isSignedIn) return;
                navigateTo(formatLink(targetRoute));
                // prevent duplicate redirects & memory leaks
                stop();
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
        await navigateTo(formatLink(redirectTo));
        await customerStore.logout();
        toast({
            title: t('account.auth.logoutSuccess'),
        });
    };

    return {
        rerouteIfLoggedOut,
        rerouteIfLoggedIn,
        logout,
    };
}
