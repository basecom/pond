export default {
    menu: 'static! justify-start!',
    trigger: 'px-3 py-2 text-sm font-medium hover:text-primary',
    content: 'pt-4',
    list: 'grid w-max gap-3 p-6 pt-4 text-sm lg:grid-cols-2',

    linkItem: {
        link: 'text-sm hover:text-primary block px-2 py-1',
        item: 'text-sm block px-2 py-1',
        iconWrapper: 'flex cursor-pointer items-center',
        icon: 'ml-auto',
    },

    mobile: {
        outer: 'flex items-center md:hidden',
        trigger: 'size-5',
        icon: 'size-5',
        header: 'text-left!',
        description: 'text-initial text-base',
        categoryList: 'grid gap-2',
        categoryItem: 'border-b-2 border-gray-100 py-3',
        backLink: 'flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3',
    },
};
