export default {
    accordion: {
        content: {
            outer: 'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            inner: 'pb-4 pt-0',
        },
        item: 'border-b',
        trigger: {
            outer: 'cursor-pointer flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
            icon: 'size-4 shrink-0 text-gray-500 transition-transform duration-200',
        },
    },

    alert: {
        base: 'relative w-full rounded-lg border border-gray-200 px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-950 [&>svg~*]:pl-7',
        variants: {
            default: 'bg-white text-gray-950',
            destructive: 'border-red-500/50 text-red-500',
            successful: 'border-green-500/50 text-green-500',
        },
        description: 'text-sm [&_p]:leading-relaxed',
        title: 'mb-1 font-bold leading-none tracking-tight',
    },

    badge: {
        base: 'inline-flex items-center rounded-md border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
        variants: {
            default: 'border-transparent bg-gray-900 text-gray-50 shadow hover:bg-gray-900/80',
            secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80',
            destructive: 'border-transparent bg-red-500 text-white shadow hover:bg-red-500/80',
            outline: 'text-gray-950',
            success: 'border-transparent bg-green-500 text-white shadow hover:bg-green-500/80',
        },
    },

    breadcrumb: {
        ellipsis: {
            outer: 'flex h-9 w-9 items-center justify-center',
            icon: 'size-4',
        },
        item: 'inline-flex items-center gap-1.5',
        link: 'transition-colors hover:text-gray-950',
        list: 'flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-500 sm:gap-2.5',
        page: 'font-normal text-gray-950',
        separator: 'size-3.5',
    },

    button: {
        base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
        variants: {
            default: 'bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90',
            destructive: 'bg-red-500 text-gray-50 shadow-sm hover:bg-red-500/90',
            outline: 'border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900',
            secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80',
            ghost: 'hover:bg-gray-100 hover:text-gray-900',
            link: 'text-gray-900 underline underline-offset-4',
        },
        size: {
            default: 'h-9 px-4 py-2',
            xs: 'h-7 rounded px-2',
            sm: 'h-8 rounded-md px-3 text-xs',
            lg: 'h-10 rounded-md px-8',
            icon: 'size-9',
        },
        spinner: 'mr-2 size-4 animate-spin',
    },

    checkbox: {
        outer: 'peer h-4 w-4 shrink-0 rounded-sm border border-gray-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 cursor-pointer',
        indicator: 'flex size-full items-center justify-center text-current',
        icon: 'size-4',
    },

    dialog: {
        close: {
            pointer: 'cursor-pointer',
            outer: 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500',
            icon: 'size-4',
        },
        overlay: 'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        content: 'fixed md:left-1/2 md:top-1/2 z-50 grid w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 gap-4 border border-gray-200 bg-white p-6 shadow-lg duration-200 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-t-lg md:rounded-b-lg inset-x-0 bottom-0 md:bottom-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        description: 'text-sm text-gray-500',
        footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2',
        header: 'flex flex-col gap-y-1.5 text-center sm:text-left',
        scroll: {
            overlay: 'fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            content: 'relative z-50 grid w-full max-w-lg my-8 gap-4 border border-gray-200 bg-white p-6 shadow-lg duration-200 sm:rounded-lg md:w-full',
            close: 'absolute right-4 top-4 rounded-md p-0.5 transition-colors hover:bg-gray-100',
            icon: 'size-4',
        },
        title: 'text-lg font-semibold leading-none tracking-tight',
    },

    dropdown: {
        item: {
            outer: 'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-disabled:pointer-events-none data-disabled:opacity-50',
            inner: 'absolute left-2 flex size-3.5 items-center justify-center',
            icon: 'size-4',
        },
        content: 'z-50 min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        menuItem: 'relative flex cursor-pointer select-none items-center rounded-sm gap-2 px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-disabled:pointer-events-none data-disabled:opacity-50  [&>svg]:size-4 [&>svg]:shrink-0',
        inset: 'pl-8',
        label: 'px-2 py-1.5 text-sm font-semibold',
        radio: {
            outer: 'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-disabled:pointer-events-none data-disabled:opacity-50',
            inner: 'absolute left-2 flex size-3.5 items-center justify-center',
            icon: 'size-4 fill-current',
        },
        separator: '-mx-1 my-1 h-px bg-gray-100',
        shortcut: 'ml-auto text-xs tracking-widest opacity-60',
        subContent: 'z-50 min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        subTrigger: {
            outer: 'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 data-[state=open]:bg-gray-100',
            icon: 'ml-auto size-4',
        },
        menuTrigger: 'outline-none cursor-pointer',
    },

    input: 'flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50',

    label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',

    navigationMenu: {
        triggerStyle: 'group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-gray-100/50 data-[state=open]:bg-gray-100/50',
        root: 'relative z-10 flex w-full flex-1 items-center justify-center',
        content: 'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
        indicator: {
            outer: 'top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
            inner: 'relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-gray-200 shadow-md',
        },
        list: 'group flex flex-1 list-none items-center justify-center gap-x-1',
        trigger: 'relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180',
        viewport: 'origin-top-center relative mt-1.5 h-(--reka-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-(--reka-navigation-menu-viewport-width)',
    },

    popover: {
        content: 'z-50 w-72 rounded-md border border-gray-200 bg-white p-4 text-gray-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        trigger: 'cursor-pointer',
    },

    radioGroup: {
        root: 'grid gap-2',
        item: {
            outer: 'peer aspect-square h-4 w-4 rounded-full border border-gray-900 text-gray-900 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
            indicator: 'flex items-center justify-center',
            icon: 'size-3.5 text-gray-900',
        },
    },

    select: {
        content: {
            outer: 'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-gray-200 bg-white text-gray-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            outerPopperPosition: 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            viewport: 'p-1',
            viewportPopperPosition: 'h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)',
        },
        group: 'p-1 w-full',
        item: {
            outer: 'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-disabled:pointer-events-none data-disabled:opacity-50',
            inner: 'absolute right-2 flex size-3.5 items-center justify-center',
            icon: 'size-4',
        },
        label: 'px-2 py-1.5 text-sm font-semibold',
        scrollDownButton: {
            outer: 'flex cursor-default items-center justify-center py-1',
            icon: '',
        },
        scrollUpButton: {
            outer: 'flex cursor-default items-center justify-center py-1',
            icon: '',
        },
        separator: '-mx-1 my-1 h-px bg-gray-100',
        trigger: {
            outer: 'cursor-pointer flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white data-placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start',
            icon: 'size-4 shrink-0 opacity-50',
        },
    },

    separator: {
        outer: {
            base: 'shrink-0 bg-gray-200 relative',
            vertical: 'w-px h-full',
            horizontal: 'h-px w-full',
        },
        inner: {
            base: 'text-xs text-gray-500 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center',
            vertical: 'w-px px-1 py-2',
            horizontal: 'h-px py-1 px-2',
        },
    },

    sheet: {
        base: 'fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
        variants: {
            top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
            bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
            right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
        },
        close: 'cursor-pointer',
        overlay: 'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        description: 'text-sm text-gray-500',
        footer: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2',
        header: 'flex flex-col gap-y-2 text-center sm:text-left',
        title: {
            outer: 'text-lg font-semibold text-gray-950 flex items-center justify-between',
            close: 'cursor-pointer rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100',
            icon: 'size-4',
        },
        trigger: 'cursor-pointer',
    },

    skeleton: 'animate-pulse rounded-md bg-gray-900/10',

    switch: {
        outer: 'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=unchecked]:bg-gray-200',
        thumb: 'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
    },

    textarea: 'flex min-h-[60px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50',

    toast: {
        base: 'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-gray-200 p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        variants: {
            default: 'border bg-white text-gray-950',
            destructive: 'destructive group border-red-500 bg-red-500 text-gray-50',
        },
        action: 'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-gray-100/40 group-[.destructive]:hover:border-red-500/30 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-gray-50 group-[.destructive]:focus:ring-red-500',
        close: {
            outer: 'absolute right-1 top-1 rounded-md p-1 text-gray-950/50 opacity-0 transition-opacity hover:text-gray-950 focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 cursor-pointer',
            icon: 'size-4',
        },
        description: 'text-sm opacity-90',
        toaster: 'grid gap-1',
        title: 'text-sm font-semibold [&+div]:text-xs',
        viewport: 'fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
    },
};
