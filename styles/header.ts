import navigation from './navigation';

export default {
    outer: 'sticky top-0 z-30 h-fit bg-white shadow',
    container: 'container relative py-3',
    wrapper: 'flex items-center justify-between gap-4 md:grid md:grid-cols-[80%_auto]',
    leftSection: 'flex items-center gap-2',
    logo: 'w-6 h-6 min-w-6',

    actions: {
        wrapper: 'flex items-center gap-3.5',

        account: {
            trigger: 'size-5',
            icon: 'size-5',
            logoutItem: 'cursor-pointer',
            loginTrigger: 'w-full',

            mobile: {
                trigger: 'size-5',
                icon: 'size-5',
                description: 'text-initial text-base text-start grid gap-2',
                logoutWrapper: 'cursor-pointer',
                logout: 'flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3',
                loginTrigger: 'w-full text-start',
            },
        },

        cart: {
            trigger: 'size-5 relative',
            icon: 'size-5',
            badge: 'absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal',
        },

        search: '!size-5 cursor-pointer',

        wishlist: {
            trigger: 'relative h-5',
            icon: 'size-5',
            badge: 'absolute -right-2 -top-1.5 px-1 py-0 text-xs font-normal',
        },
    },
    navigation,
};
