<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

withDefaults(
    defineProps<{
      spinnerClasses?: { [key: string]: boolean };
      isLoading?: boolean;
    }>(),
    {
        spinnerClasses: () => ({}),
        isLoading: false,
    },
);
</script>

<template>
    <slot name="loading-spinner-wrapper">
        <div
            class="relative" 
            :class="{ 'pointer-events-none opacity-50': isLoading }"
        >
            <div v-if="isLoading" class="absolute flex size-full items-center justify-center">
                <slot name="loading-spinner">
                    <Loader2 class="size-12 animate-spin" :class="spinnerClasses" />
                </slot>
            </div>
            <div class="flex flex-wrap border-b py-4">
                <slot name="loading-spinner-content" />
            </div>
        </div>
    </slot>
</template>
