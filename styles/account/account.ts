import order from './order';
import personalData from './personalData';
import address from './address';
import wishlist from './wishlist';

export default {
    actionLink: 'flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3',
    breadcrumb: 'mt-4 md:mt-6',
    pageDescription: 'my-2',

    login: {
        form: 'space-y-6',
        outer: 'mt-0! grid',
        passwordForgotten: 'mb-6 justify-self-start py-2 text-sm underline underline-offset-4',
        alert: {
            outer: 'mb-4 flex gap-4',
            icon: 'size-4 text-red-500',
        },
        page: {
            outer: 'container relative flex justify-center py-4',
            inner: 'w-full md:w-2/3 xl:w-1/2',
            headline: 'mb-4',
        },
    },

    register: {
        outer: 'flex flex-col justify-center gap-5',
        headline: 'text-center',
        addressHeadline: 'col-span-12',
        alert: {
            outer: 'mb-4 flex gap-4 col-span-12',
            icon: 'size-4 text-red-500',
        },
        submit: 'col-span-12',
        page: {
            outer: 'container flex justify-center py-4',
            inner: 'w-full',
        },
    },

    recover: {
        page: 'container flex justify-center md:w-2/3 xl:w-1/2 pt-4',
        alert: {
            outer: 'mb-4 flex gap-4',
            icon: 'size-4 shrink-0',
        },
        description: 'pb-4 pt-2 text-sm',
        form: {
            outer: 'space-y-6',
            buttons: {
                outer: 'flex flex-wrap gap-4',
                cancel: 'w-fit grow sm:grow-0',
                submit: 'min-w-52 grow',
            },
        },
        password: {
            outer: 'grid gap-5 w-full',
            button: 'col-span-12',
        },
    },

    menu: {
        accordion: {
            outer: 'mb-4 md:hidden',
            item: 'border-gray-100',
            trigger: 'text-lg font-bold',
            content: 'text-base',
            links: {
                outer: 'grid gap-2',
                item: 'max-w-max',
                activeItem: 'font-bold',
            },
        },
        welcome: 'mb-4 text-xl font-bold',
        navigation: {
            outer: 'hidden md:block',
            links: {
                outer: 'grid gap-4',
                item: 'max-w-max',
                activeItem: 'font-bold',
            },
            separator: 'my-4',
            logout: 'max-w-max cursor-pointer',
        },
    },

    dataProtection: {
        content: 'max-h-3/4 overflow-scroll md:!max-w-3/4',
        skeleton: 'w-full h-50 mt-2.5',
        trigger: 'underline underline-offset-2 cursor-pointer mx-1',
    },

    newsletter: {
        outer: 'col-start-1 col-span-2',
        headline: 'mb-2 border-b border-gray-100 pb-2',
        alert: {
            outer: 'mb-4 flex gap-4',
            icon: 'size-4 shrink-0',
        },
    },

    order,
    personalData,
    address,
    wishlist,
};
