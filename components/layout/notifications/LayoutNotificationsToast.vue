<script setup lang="ts">
import type { Notification } from '@shopware/composables';

withDefaults(
    defineProps<{
      notification?: Notification
    }>(),
    {
      notification: undefined
    },
);
</script>

<template>
  <LayoutNotificationsToastInner
      :notification="notification"
  />
</template>
