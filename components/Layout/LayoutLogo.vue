<script setup lang="ts">
withDefaults(
    defineProps<{
        smallLogo?: boolean;
        logoClasses?: string;
        smallLogoClasses?: string;
        withLink?: boolean;
    }>(),
    {
        smallLogo: false,
        logoClasses: '',
        smallLogoClasses: '',
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
            width="160"
            height="38"
        >

        <img
            v-else
            src="/logo-small.svg"
            :alt="shopName"
            :title="shopName"
            :class="smallLogoClasses"
            width="48"
            height="48"
        >
    </LocaleLink>
</template>
