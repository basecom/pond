export default {
    loading: {
        outer: 'flex justify-center flex-wrap p-4 md:p-6 lg:p-8',
        inner: 'w-full mb-8 sm:w-3/7 lg:w-2/7 2xl:w-7/24 mr-0 sm:mr-8 mb-8',
    },
    pagination: {
        outer: 'grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8',
        inner: 'text-center place-self-center',
        page: {
            outer: 'text-center place-self-center mt-2 lg:mt-0',
            inner: 'inline-block align-top text-center md:text-left',
            limit: {
                label: 'inline mr-4',
                select: 'inline appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline',
            },
            svg: {
                outer: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700',
                inner: 'fill-current h-4 w-4',
            },
        },
    },
    price: {
        listPrice: {
            outer: 'text-l text-gray-900 basis-2/6 justify-end line-through',
            placeholder: 'h-6',
        },
        variantPrice: {
            outer: 'text-xl text-gray-900 basis-2/6 justify-end',
            inner: 'text-sm',
        },
        unitPrice: {
            outer: {
                default: 'text-gray-900 basis-2/6',
                listPrice: 'text-red-600 font-bold',
                position: 'justify-end text-xl',
            },
            inner: 'text-sm',
        },
        regulationPrice: {
            outer: 'flex gap-2 justify-end text-gray-500 text-3.5 mb-2',
            inner: 'h-7',
        },
    },
};
