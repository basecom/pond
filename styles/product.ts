export default {
    add: {
        outer: 'w-full',
        inner: 'flex ml-2 items-center',
        icon: 'size-4 mr-1',
    },
    card: {
        outer: 'relative sw-product-card not-prose group flex max-w-full flex-col justify-between rounded-lg border border-gray-200 bg-white transition duration-300 hover:shadow-lg',
        cover: {
            outer: {
                default: 'group relative inline-block flex-none w-full overflow-hidden rounded-t-lg h-40 md:h-60',
                layout: 'h-40 md:h-80',
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
                outer: 'min-h-4 text-xs text-gray-600',
                inner: 'font-bold',
            },
            title: {
                outer: 'mt-2 line-clamp-2',
                inner: 'text-lg my-0',
            },
            description: 'mt-3 md:mt-6 text-sm text-gray-600 line-clamp-3 md:line-clamp-5',
            price: 'ml-auto',
            detailsButton: 'w-full',
        },
        reviews: {
            outer: 'h-3 sm:h-4 md:h-5',
            icon: {
                default: 'size-3 sm:size-4 md:size-5',
                color: 'text-gray-500',
                noColor: 'text-yellow-500',
            },
        },
        badge: {
            outer: 'absolute top-0 flex flex-col gap-1 p-2 z-2',
            sale: {
                outer: 'bg-red-500 w-fit hover:bg-red-500',
                icon: 'size-4 shrink-0',
            },
            topseller: '!bg-brown-500 hover:!bg-brown-500',
            new: 'bg-green-600 hover:bg-green-600',
        },
    },
};
