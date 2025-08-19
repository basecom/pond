export default {
    empty: 'text-gray-500',

    lineItem: {
        cover: {
            product: 'size-20 rounded-md border border-gray-200 object-contain p-1',
            fallback: 'size-20 rounded-md border border-gray-200 object-contain p-1',
            video: 'size-20 rounded-md border border-gray-200 object-contain p-1',
            wishlist: {
                outer: '!absolute right-2 top-2 !p-0 !size-4 hover:bg-transparent',
                icon: 'size-4',
            },
        },
        quantity: 'mt-4 w-max ml-auto',
    },

    summary: {
        links: {
            outer: 'space-y-4 mt-2',
            confirm: 'w-full',
            cart: 'w-full',
        },
    },
};
