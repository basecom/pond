export default {
    lineItem: {
        wrapper: 'flex flex-col md:grid md:grid-cols-5 gap-5 border-b border-gray-100 p-2',
        base: 'flex col-span-2 gap-2.5',
        cover: 'object-center object-contain h-16 aspect-square',
        promotion: {
            wrapper: 'h-16 w-16 border border-gray-300 items-center flex justify-center',
            icon: 'size-4 shrink-0',
        },
        info: 'flex flex-col',
        label: 'font-bold',
        quantity: {
            wrapper: 'w-full md:col-start-3 flex justify-between md:justify-center',
            label: 'font-bold md:hidden',
        },
        unitPrice: 'justify-center hidden md:flex',
        totalPrice: 'flex justify-center font-bold',
    },
};
