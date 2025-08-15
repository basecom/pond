<script setup lang="ts">
const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="page-loader">
        <div :class="getStyle('layout.loader.outer')">
            <Icon name="mdi:loading" :class="getStyle('layout.loader.icon')" />
        </div>
    </slot>
</template>
