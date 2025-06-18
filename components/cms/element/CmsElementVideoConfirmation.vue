<script setup lang="ts">
const props = defineProps<{
  previewUrl: string;
  alt?: string;
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div
        class="cms-element-video-confirmation relative w-full aspect-video flex items-center justify-center overflow-hidden"
        style="min-height: 200px;"
    >
        <img
            :src="previewUrl"
            :alt="alt || 'Video preview'"
            class="absolute inset-0 w-full h-full object-cover"
            draggable="false"
        />
        <div
            class="absolute inset-0 bg-black opacity-60"
            style="pointer-events: none;"
        ></div>
        <div class="relative z-10 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg shadow-lg px-8 py-6 max-w-xs w-full">
             <div class="text-gray-700 text-center text-xs leading-relaxed">
                {{ $t('general.privacyNoticeText') }}
            </div>
            <UiButton
                class="w-full mb-4 px-6 py-3 mt-4"
                color="primary"
                @click="emit('update:modelValue', true)"
            >
               {{  $t('cms.video.acceptButtonLabel') }}
            </UiButton>
        
        </div>
    </div>
</template>
