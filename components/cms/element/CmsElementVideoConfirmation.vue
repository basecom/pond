<script setup lang="ts">
withDefaults(
    defineProps<{
        previewUrl?: string;
        alt?: string;
    }>(),
    {
        previewUrl: undefined,
        alt: 'Video preview',
    },
);
const emits = defineEmits<{
    confirm: [hasConfirmed: boolean];
}>();
</script>

<template>
    <slot name="wrapper">
        <div class="relative w-full aspect-video flex items-center justify-center overflow-hidden min-h-52">
            <slot name="preview">
                <img
                    v-if="previewUrl"
                    :src="previewUrl"
                    :alt="alt"
                    class="absolute inset-0 w-full h-full object-cover"
                    draggable="false"
                >
            </slot>
            <slot name="background">
                <div
                    class="absolute inset-0 bg-black opacity-60 pointer-events-none"
                />
            </slot>
            <slot name="privacyNotice">
                <div class="relative z-10 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg shadow-lg px-8 py-6 max-w-xs w-full">
                    <div class="text-center text-xs leading-relaxed">
                        <slot name="notice">
                            {{ $t('general.privacyNoticeText') }}
                        </slot>
                    </div>
                    <slot name="actions">
                        <UiButton
                            class="w-full mb-4 px-6 py-3 mt-4"
                            color="primary"
                            @click="emits('confirm', true)"
                        >
                            {{  $t('general.button.acceptLabel') }}
                        </UiButton>
                    </slot>
                </div>
            </slot>
        </div>
    </slot>
</template>
