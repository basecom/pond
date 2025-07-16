export default {
    add: {
        outer: 'w-full',
        inner: 'flex ml-2 items-center',
        icon: 'size-4 mr-1',
    },
    card: {
        outer: 'sw-product-card not-prose group relative flex max-w-full flex-col justify-between rounded-lg border border-gray-200 bg-white transition duration-300 hover:shadow-lg',
        cover: {
            outer: {
                default: 'group relative inline-block flex-none w-full overflow-hidden rounded-t-lg h-60',
                layout: 'h-80',
                media: 'hover:opacity-75',
            },
            default: 'absolute inset-0 size-full rounded-t-lg',
            fallback: 'm-auto h-full object-contain p-8',
            object: {
                cover: 'object-cover',
                contain: 'object-contain',
                scale: 'object-scale-down',
            },
        },
        information: {
            outer: 'p-4 h-full flex flex-col justify-between',
            variant: {
                outer: 'min-h-4 mt-4 text-xs text-gray-600',
                inner: 'font-bold',
            },
            title: {
                outer: 'mt-4 line-clamp-2',
                inner: 'text-lg my-0',
            },
            description: 'mt-6 text-sm text-gray-600 line-clamp-5',
            price: 'ml-auto',
            detailsButton: 'w-full',
        },
    },
};
