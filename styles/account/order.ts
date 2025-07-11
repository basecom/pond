export default {
    order: {
        skeleton: {
            outer: 'flex flex-col gap-5',
            wrapper: 'flex gap-5',
            large: 'w-20 h-25',
            collection: {
                outer: 'space-y-2 w-full',
                inner: 'h-4 w-full',
            },
            medium: 'w-full h-15',
        },
        header: {
            outer: 'flex flex-col gap-2 p-4 pb-0 md:pb-4',
            inner: 'hidden md:grid grid-cols-5 gap-5',
            product: 'col-span-2 font-bold',
            quantity: 'col-start-3 flex justify-center font-bold',
            unitPrice: 'flex justify-center font-bold',
            totalPrice: 'flex justify-center font-bold',
            separator: 'md:mt-2.5 text-gray-300',
        },
        information: {
            outer: 'flex flex-col md:flex-row justify-between bg-gray-100 p-4',
            general: {
                outer: 'grid grid-cols-2 md:grid-cols-3 gap-2',
                label: 'font-bold col-start-1',
                value: 'text-end md:col-span-2 md:text-start',
            },
        },
        price: {
            outer: 'grid grid-cols-2 gap-2 h-fit',
            label: 'font-bold',
            value: 'flex justify-end col-start-2',
        },
    },
};
