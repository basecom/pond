<script setup lang="ts">
const { getStyle } = usePondStyle();
</script>

<template>
    <div :class="getStyle('account.recover.page')">
        <AccountPageRecover />
    </div>
</template>
