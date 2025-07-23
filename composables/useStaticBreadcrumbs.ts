/**
 * This function returns the breadcrumb hierarchy for static pages, such as account and checkout.
 * Options can be defined to e.g. display only parts of the hierarchy or to alter its structure.
 */
export function useStaticBreadcrumbs() {
    const { t } = useI18n();

    const checkoutBreadcrumbs = ({ index, orderId }: { index: number; orderId?: string }) => {
        const breadcrumbs = [
            {
                name: t('composable.breadcrumbs.cartName'),
                path: '/checkout/cart',
            },
            {
                name: t('composable.breadcrumbs.checkoutName'),
                path: '/checkout/confirm',
            },
            {
                name: t('composable.breadcrumbs.orderName'),
                path: orderId ? `/checkout/finish/${orderId}` : '/checkout/finish',
            },
        ];

        return breadcrumbs.slice(0, index + 1);
    };

    const accountBreadcrumbs = ({ type }: { type?: string }) => {
        const breadcrumbs = [
            {
                name: t('composable.breadcrumbs.accountName'),
                path: '/account',
            },
        ];

        if (type === 'login') {
            breadcrumbs.push({
                name: t('composable.breadcrumbs.loginName'),
                path: '/account/login',
            });

            return breadcrumbs;
        }

        if (type === 'register') {
            breadcrumbs.push({
                name: t('composable.breadcrumbs.registerName'),
                path: '/account/register',
            });

            return breadcrumbs;
        }

        if (type === 'recover') {
            breadcrumbs.push({
                name: t('composable.breadcrumbs.recoverName'),
                path: '/account/recover',
            });

            return breadcrumbs;
        }

        if (type === 'profile') {
            breadcrumbs.push({
                name: t('composable.breadcrumbs.profileName'),
                path: '/account/profile',
            });

            return breadcrumbs;
        }

        if (type === 'address') {
            breadcrumbs.push({
                name: t('composable.breadcrumbs.addressName'),
                path: '/account/address',
            });

            return breadcrumbs;
        }

        if (type === 'payment') {
            breadcrumbs.push({
                name: t('composable.breadcrumbs.paymentName'),
                path: '/account/payment',
            });

            return breadcrumbs;
        }

        if (type === 'orders') {
            breadcrumbs.push({
                name: t('composable.breadcrumbs.ordersName'),
                path: '/account/orders',
            });

            return breadcrumbs;
        }

        return breadcrumbs;
    };

    return { checkoutBreadcrumbs, accountBreadcrumbs };
}
