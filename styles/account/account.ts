import order from './order';

export default {
    actionLink: 'flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3',
    breadcrumb: 'mt-4 md:mt-6',
    login: {
        form: 'space-y-6',
        outer: 'mt-0! grid',
        passwordForgotten: 'mb-6 justify-self-start py-2 text-sm underline underline-offset-4',
        alert: {
            outer: 'mb-4 flex gap-4',
            icon: 'size-4 text-red-500',
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
    order,
};
