<script setup lang="ts">
const { count: wishlistCount } = useWishlist();
const { t } = useI18n();
</script>

<template>
    <LocaleLink
        to="/wishlist"
        class="relative"
        :title="t('icon.wishlist')"
    >
        <FormKitIcon
            class="block size-6"
            icon="heart"
            :title="t('icon.wishlist')"
        />

        <ClientOnly>
            <UtilityPill
                :number="wishlistCount"
                class="absolute bottom-2.5 left-3"
            />
        </ClientOnly>
    </LocaleLink>
</template>
