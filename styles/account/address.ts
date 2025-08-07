export default {
    outer: 'flex flex-col gap-5 md:grid grid-cols-2',
    headline: 'col-span-2',
    subHeadline: 'col-span-2 border-b border-gray-100 pb-2 mb-2 md:mb-4',
    icon: 'size-4',
    deleteAddressButton: 'w-1/2',
    setDefaultAddressButton: 'pl-0 justify-start',
    boldText: 'font-bold',
    dialog: {
        outer: 'w-full',
        inner: 'max-h-4/5 overflow-scroll md:!max-w-1/2 overflow-visible',
    },
    trigger: {
        outer: 'flex flex-start w-1/2',
    },
    availableAddresses: {
        outer: 'gap-2 flex flex-col',
        inner: 'flex gap-2',
    },
    editOrCreateAddressButton: {
        trigger: 'w-full',
        submit: 'col-span-12',
    },
    card: {
        outer: 'space-y-1',
        skeleton: {
            outer: 'grid grid-cols-2 gap-2',
            cover: 'w-full h-5 col-span-2',
            inner: 'w-full h-5',
        },
    },
    deleteAddress: {
        outer: 'w-full flex gap-3',
        button: 'w-full',
    },
    badges: 'flex gap-2.5 md:gap-5',
};
