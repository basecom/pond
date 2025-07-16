<script setup lang="ts">
const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="address-card-skeleton">
        <div
            :class="getStyle('account.address.card.skeleton.outer')"
        >
            <UiSkeleton :class="getStyle('account.address.card.skeleton.cover')" />

            <UiSkeleton :class="getStyle('account.address.card.skeleton.inner')" />
            <UiSkeleton :class="getStyle('account.address.card.skeleton.inner')" />
            <UiSkeleton :class="getStyle('account.address.card.skeleton.inner')" />
            <UiSkeleton :class="getStyle('account.address.card.skeleton.inner')" />
            <UiSkeleton :class="getStyle('account.address.card.skeleton.inner')" />
            <UiSkeleton :class="getStyle('account.address.card.skeleton.inner')" />
        </div>
    </slot>
</template>
