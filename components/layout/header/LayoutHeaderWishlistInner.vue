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
</script>

<template>
    <slot name="wrapper">
        <NuxtLinkLocale
            id="wishlist"
            to="/wishlist"
            :class="getStyle('header.actions.wishlist.trigger')"
            aria-label="wishlist"
        >
            <slot name="wishlist-icon">
                <Icon
                    name="mdi:cards-heart-outline"
                    :class="getStyle('header.actions.wishlist.icon')"
                />
            </slot>

            <slot name="wishlist-badge">
                <UiBadge
                    v-if="wishlistItemsCount > 0"
                    :class="getStyle('header.actions.wishlist.badge')"
                >
                    {{ wishlistItemsCount }}
                </UiBadge>
            </slot>
        </NuxtLinkLocale>
    </slot>
</template>
