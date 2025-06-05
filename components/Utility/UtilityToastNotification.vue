<script setup lang="ts">
import type { Notification } from '@shopware-pwa/composables-next';

const props = defineProps<{
    notification: Notification;
}>();

const { t } = useI18n();

const iconMap = {
    info: 'info',
    success: 'check',
    warning: 'triangle-exclamation',
    danger: 'ban',
};

const icon = computed(() => iconMap[props.notification.type] || 'information');
</script>

<template>
    <div
        v-if="notification.message.length > 0"
        class="flex items-center gap-x-4 rounded-md border bg-white p-3 shadow-lg"
        :class="{
            'border-status-info': notification.type === 'info',
            'border-status-success': notification.type === 'success',
            'border-status-important': notification.type === 'warning',
            'border-status-danger': notification.type === 'danger',
        }"
        role="alert"
    >
        <FormKitIcon
            :icon="icon"
            :title="t(`icon.${icon}`)"
            class="block size-7 shrink-0 rounded-md p-1.5 text-white"
            :class="{
                'bg-status-info': notification.type === 'info',
                'bg-status-success': notification.type === 'success',
                'bg-status-important': notification.type === 'warning',
                'bg-status-danger': notification.type === 'danger',
            }"
        />

        <div class="leading-4">
            {{ notification.message }}
        </div>
    </div>
</template>
