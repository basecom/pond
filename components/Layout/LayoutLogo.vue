<script setup lang="ts">
withDefaults(
    defineProps<{
        smallLogo?: boolean;
        logoClasses?: string;
        withLink?: boolean;
    }>(),
    {
        smallLogo: false,
        logoClasses: '',
        withLink: true,
    },
);

const configStore = useConfigStore();
const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';
</script>

<template>
    <LocaleLink
        :aria-label="shopName"
        :title="shopName"
        :to="withLink ? '/' : ''"
    >
        <img
            v-if="!smallLogo"
            src="/logo.svg"
            :alt="shopName"
            :title="shopName"
            :class="logoClasses"
        >

        <img
            v-else
            src="/logo-small.svg"
            :alt="shopName"
            :title="shopName"
            :class="logoClasses"
        >
    </LocaleLink>
</template>
