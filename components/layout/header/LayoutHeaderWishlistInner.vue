<script setup lang="ts">
withDefaults(
    defineProps<{
      wishlistItemsCount?: number;
    }>(),
    {
        wishlistItemsCount: 0,
    },
);

const { getStyle } = usePondStyle();
const triggerStyles = getStyle('header.actions.wishlist.trigger');
const iconStyles = getStyle('header.actions.wishlist.icon');
const badgeStyles = getStyle('header.actions.wishlist.badge');
</script>

<template>
    <slot name="wrapper">
        <NuxtLinkLocale
            id="wishlist"
            to="/wishlist"
            :class="triggerStyles"
            aria-label="wishlist"
        >
            <slot name="wishlist-icon">
                <Icon
                    name="mdi:cards-heart-outline"
                    :class="iconStyles"
                />
            </slot>

            <slot name="wishlist-badge">
                <UiBadge
                    v-if="wishlistItemsCount > 0"
                    :class="badgeStyles"
                >
                    {{ wishlistItemsCount }}
                </UiBadge>
            </slot>
        </NuxtLinkLocale>
    </slot>
</template>
