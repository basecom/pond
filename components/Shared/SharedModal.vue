<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        controller?: ReturnType<typeof useModal>;
        withCloseButton?: boolean;
        withActionsButton?: boolean;
        size?: 'sm' | 'md' | 'lg';
        showHeader?: boolean;
    }>(),
    {
        controller: () => useModal(false),
        withCloseButton: false,
        withActionsButton: false,
        size: 'md',
        showHeader: true,
    },
);
const { controller } = toRefs(props);
const { t } = useI18n();

const onUpdatedOpen = (value: boolean) => {
    if (value) {
        controller.value.open();
    } else {
        controller.value.close();
    }
};
</script>

<template>
    <DialogRoot
        v-model:open="controller.isOpen.value"
        @update:open="onUpdatedOpen"
    >
        <DialogTrigger as-child>
            <slot name="trigger" />
        </DialogTrigger>
        <DialogPortal>
            <Transition
                enter-active-class="transition ease-out duration-200 transform"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-200 transform"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <DialogOverlay class="data-[state=open]:animate-overlayShow fixed inset-0 z-30 bg-black/50" />
            </Transition>
            <Transition
                enter-active-class="transition ease-out duration-300 transform "
                enter-from-class="-translate-y-10 scale-50"
                enter-to-class="translate-y-0 scale-100"
                leave-active-class="ease-in duration-300"
                leave-from-class="translate-y-0 scale-100"
                leave-to-class="-translate-y-10 scale-50"
            >
                <DialogContent
                    class="fixed left-1/2 top-8 z-[100] max-h-[calc(100vh-4rem)] w-full -translate-x-1/2 overflow-auto rounded-lg bg-white shadow-lg focus:outline-none"
                    :class="{
                        'max-w-[calc(100%-40px)] md:max-w-[min(calc(100%-40px),320px)]': size === 'sm',
                        'max-w-[calc(100%-40px)] md:max-w-[min(calc(100%-40px),600px)]': size === 'md',
                        'max-w-[calc(100%-40px)] md:max-w-[min(calc(100%-40px),66.66%)]': size === 'lg',
                    }"
                >
                    <DialogTitle
                        v-if="showHeader"
                        class="border-b border-gray-light px-6 pb-4 pt-6 font-bold"
                    >
                        <slot name="title" />
                    </DialogTitle>
                    <div class="px-6 py-4">
                        <DialogDescription>
                            <slot name="description" />
                        </DialogDescription>
                        <slot name="content" />
                    </div>
                    <div
                        v-if="withActionsButton"
                        class="flex justify-between border-t border-gray-light px-6 pb-6 pt-4"
                    >
                        <slot name="actions">
                            <DialogClose as-child>
                                <FormKit
                                    type="button"
                                    :label="$t('shared.modal.cancelButtonLabel')"
                                    :classes="{
                                        outer: 'w-full',
                                    }"
                                />
                            </DialogClose>
                        </slot>
                    </div>
                    <DialogClose
                        v-if="withCloseButton"
                        class="absolute right-5 top-5 size-5 items-center justify-center text-gray hover:text-black focus:text-black"
                        :aria-label="$t('shared.modal.closeButtonAriaLabel')"
                    >
                        <FormKitIcon
                            class="block"
                            icon="xmark"
                            :title="t('icon.close')"
                        />
                    </DialogClose>
                </DialogContent>
            </Transition>
        </DialogPortal>
    </DialogRoot>
</template>
