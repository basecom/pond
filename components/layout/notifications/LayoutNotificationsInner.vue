<script setup lang="ts">

const { notifications } = useNotifications();



</script>
<template>
  <UiToaster />
  <LayoutNotificationsToast v-for="notification in notifications"
                           :key=notification.id
                           :notification="notification" />
</template>