<script setup lang="ts">
const { getStyle } = usePondStyle();
</script>

<template>
    <Icon name="mdi:magnify" :class="getStyle('header.actions.search')" />
</template>
