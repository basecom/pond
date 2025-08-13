import type { UseAnalyticsReturn } from '~/types/analytics/Analytics';

export function useCheckoutPageTracking(analytics: UseAnalyticsReturn) {
    const { cart } = useCart();
    const isCheckoutPageReady = computed(() => !!cart.value);

    usePageTracking(analytics, 'checkout');

    whenever(
        isCheckoutPageReady,
        () => {
            analytics.trackBeginCheckout();
        },
        { once: true, immediate: true },
    );
}
