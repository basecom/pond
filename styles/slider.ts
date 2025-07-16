export default {
    container: {
        base: 'relative w-full',
        cursorGrab: 'cursor-grab',
        padding: 'px-20 max-sm:px-8',
    },
    navigation: {
        base: 'absolute z-10 top-1/2 -translate-y-1/2 py-4 lg:py-8 cursor-pointer',
        prev: {
            base: '',
            outside: 'left-5 max-sm:-left-1 bg-gray-light/50',
            inside: 'left-0 bg-gray-300 opacity-30 hover:opacity-70',
        },
        next: {
            base: '',
            outside: 'right-5 max-sm:right-0 bg-gray-light/50',
            inside: 'right-0 bg-gray-300 opacity-30 hover:opacity-70',
        },
        icon: 'size-8 shrink-0 opacity-50',
    },
    pagination: {
        wrapper: 'swiper swiper-horizontal flex w-full justify-center mt-4',
        inside: 'absolute left-0 bottom-0 z-20 mb-2',
        container: 'swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal flex',
        bullet: 'swiper-pagination-bullet bg-gray-400 block w-4 h-4 rounded-full mx-2 opacity-100 transition-all cursor-pointer',
        bulletActive: 'swiper-pagination-bullet-active bg-brand-primary! shadow-brand-primary shadow-sm',
    },
};
