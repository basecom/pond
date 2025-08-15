import navigation from './navigation';

export default {
    outer: 'sticky top-0 z-30 h-fit bg-white shadow',
    container: 'container relative py-3',
    wrapper: 'flex items-center justify-between gap-4 md:grid md:grid-cols-[70%_auto]',
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
            badge: 'absolute -right-2 -top-1.5 !px-1 !py-0 text-xs font-normal',
        },

        search: {
            icon: '!size-5 cursor-pointer',
            trigger: 'flex justify-center',
            popover: 'gap-2 flex flex-col min-w-screen md:min-w-96',
            minSearchTerm: 'text-gray-500 text-sm',
            skeleton: {
                wrapper: 'gap-2.5 flex flex-col',
                outer: 'flex gap-2.5 w-full',
                innerSmall: 'w-1/4 p-2.5',
                innerBig: 'w-2/4 p-2.5',
                line: 'w-full p-2.5',
            },
            results: {
                outer: 'py-2.5 border-b border-gray-200 flex gap-2.5 w-full items-center relative',
                product: 'w-10 h-fit',
                video: 'w-10 h-fit',
                fallback: 'w-10 h-fit',
                productName: 'truncate w-full',
            },
            page: {
                outer: 'mt-3 flex items-center justify-between',
                inner: 'flex items-center gap-1',
                icon: 'h-3.5',
                results: 'text-gray-500',
            },
        },

        wishlist: {
            trigger: 'relative h-5',
            icon: 'size-5',
            badge: 'absolute -right-2 -top-1.5 !px-1 !py-0 text-xs font-normal',
        },
    },
    navigation,
};
