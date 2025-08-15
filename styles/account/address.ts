export default {
    outer: 'flex flex-col gap-5 md:grid grid-cols-2',
    headline: 'col-span-2',
    subHeadline: 'col-span-2 border-b border-gray-100 pb-2 mb-2 md:mb-4',
    icon: 'size-4 shrink-0',
    badge: 'flex gap-1 whitespace-nowrap',
    deleteAddressButton: 'w-1/2',
    setDefaultAddressButton: '!p-0 justify-start h-max',
    boldText: 'font-bold',
    text: 'truncate',
    dialog: {
        outer: 'w-full',
        inner: 'md:!max-w-4xl overflow-auto',
    },
    trigger: {
        outer: 'flex flex-start w-1/2',
    },
    availableAddresses: {
        outer: 'gap-2 flex flex-col border-b md:border pb-5 border-gray-200 md:p-5 md:rounded',
        inner: 'flex gap-2',
        actions: 'mt-auto space-y-2 pt-2',
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
    badges: {
        multiple: 'grid grid-cols-2 gap-2 md:border-b md:border-gray-200 md:pb-2.5',
        one: 'md:border-b md:border-gray-200 md:pb-2.5',
    },
};
