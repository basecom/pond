export default {
    wrapper: 'mt-auto',
    outer: 'mt-4 bg-gray-50 md:mt-10',
    container: 'container py-5 md:pb-5 md:pt-10',

    navigation: {
        wrapper: 'grid gap-5 md:flex md:justify-between lg:justify-normal lg:gap-28',
        list: 'grid list-none gap-2',
        mainElement: 'font-bold',
        mainLink: 'hover:text-gray-950 transition-colors',
        childLink: 'text-gray-700 hover:text-gray-950 transition-colors',
    },

    serviceNavigation: {
        outer: 'mt-4 grid justify-between gap-6 border-t border-gray-500/70 pt-4 text-sm text-gray-700 md:mt-8 md:flex md:pt-8',
        left: 'flex gap-2 md:gap-4 items-center',
        copyright: 'order-2 md:order-[unset]',
        languageSwitcher: 'order-3 md:order-[unset]',
        currencySwitcher: 'order-4 md:order-[unset]',
        links: 'grid gap-2 md:flex md:gap-4',
        link: 'hover:text-gray-950 transition-colors',
    },

    currencySwitcherComponent: {
        trigger: 'border-none !shadow-none p-0',
        item: 'cursor-pointer',
    },

    languageSwitcherComponent: {
        trigger: 'border-none !shadow-none p-0',
        valueWrapper: 'flex items-center gap-1',
        item: 'flex items-center gap-1 cursor-pointer',
    },
};
