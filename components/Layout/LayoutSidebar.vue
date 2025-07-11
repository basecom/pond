<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        controller: ReturnType<typeof useModal>;
        isClosable?: boolean;
        side?: 'left' | 'right' | 'bottom';
    }>(),
    {
        side: 'left',
        isClosable: true,
    },
);

const { controller } = toRefs(props);
const { isOpen, close } = controller.value;
const { t } = useI18n();

const sidebarContentElement = ref();
onClickOutside(sidebarContentElement, () => (props.isClosable ? close() : ''));
</script>

<template>
    <!-- Nuxt currently has SSR support only for teleports to #teleports, so other targets need to use a <ClientOnly> wrapper. See: https://nuxt.com/docs/api/components/teleports -->
    <ClientOnly>
        <Teleport to="body">
            <div
                ref="sidebarContentElement"
                class="fixed z-50 overflow-y-auto bg-white transition-transform duration-500"
                tabindex="-1"
                aria-labelledby="sidebar"
                :class="{
                    '!translate-x-0': isOpen && (side === 'left' || side === 'right'),
                    'top-0 h-dvh w-10/12 sm:w-96': side === 'left' || side === 'right',
                    '!translate-y-0': isOpen && side === 'bottom',
                    'bottom-0 h-[90dvh] w-full': side === 'bottom',
                    'left-0 -translate-x-full': side === 'left',
                    'right-0 translate-x-full': side === 'right',
                    'bottom-0 translate-y-full': side === 'bottom',
                }"
            >
                <div class="flex items-center justify-between bg-gray-light p-3.5">
                    <slot name="header" />

                    <FormKitIcon
                        icon="xmark"
                        :title="t('icon.close')"
                        class="my-0 ml-auto block size-4 cursor-pointer"
                        @click="controller.close()"
                    />
                </div>

                <div class="overflow-y-scroll p-4">
                    <slot name="content" />
                </div>

                <slot name="footer" />
            </div>

            <!-- body overlay -->
            <div
                v-if="isOpen"
                class="fixed inset-0 z-40 h-screen w-screen bg-black/50"
            />
        </Teleport>
    </ClientOnly>
</template>
