<script setup lang="ts">
const { getStyle } = usePondStyle();
const searchStyles = getStyle('header.actions.search');
</script>

<template>
    <Icon name="mdi:magnify" :class="searchStyles" />
</template>
