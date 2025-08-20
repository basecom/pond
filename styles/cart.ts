export default {
    empty: 'text-gray-500',

    lineItem: {
        outer: 'grid grid-cols-[max-content_auto] gap-2',
        information: {
            label: {
                outer: 'flex justify-between',
                inner: 'line-clamp-2',
            },
            remove: '!p-0 h-min w-min',
            description: 'grid gap-px mt-px text-sm text-gray-600',
            options: 'grid gap-px',
        },
        price: {
            outer: 'mt-4 text-right',
            total: 'font-bold',
            regular: 'text-sm',
        },
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

    sheet: {
        content: 'max-w-[unset] w-full',
        description: 'mb-4',
        transitionGroup: 'flex flex-col gap-4',
        separator: 'mt-4',
    },

    summary: {
        outer: 'bg-gray-100 p-4 grid gap-4 mt-3',
        positionPrice: 'grid grid-cols-2 gap-4 border-b pb-2 border-b-gray-200',
        shipping: 'grid grid-cols-2 gap-x-4 border-b pb-2 border-b-gray-200',
        total: 'grid grid-cols-2 gap-4',
        totalHighlight: 'font-bold',
        price: 'text-right',
        promotion: 'flex gap-2 my-4',
        links: {
            outer: 'space-y-4 mt-2',
            confirm: 'w-full',
            cart: 'w-full',
        },
    },
};
