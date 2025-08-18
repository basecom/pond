<script setup lang="ts">
const { formatLink } = useInternationalization();
const route = useRoute();
const { getStyle } = usePondStyle();

const breadcrumbs = computed(() => route.path.split('/').filter((breadcrumb: string) => breadcrumb !== ''));
</script>

<template>
    <UiBreadcrumb :class="getStyle('account.breadcrumb')">
        <UiBreadcrumbList>
            <UiBreadcrumbItem>
                <slot name="breadcrumb-home">
                    <UiBreadcrumbLink :href="formatLink('/')">
                        {{ $t('general.homeLink') }}
                    </UiBreadcrumbLink>
                </slot>
            </UiBreadcrumbItem>

            <slot name="breadcrumb-items">
                <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb">
                    <UiBreadcrumbSeparator />

                    <slot name="breadcrumb-item">
                        <UiBreadcrumbItem>
                            <UiBreadcrumbPage v-if="index === breadcrumbs.length - 1">
                                <template v-if="index === 0">
                                    {{ $t('account.overviewLink') }}
                                </template>
                                <template v-else>
                                    {{ $t(`account.${breadcrumb}Link`) }}
                                </template>
                            </UiBreadcrumbPage>

                            <UiBreadcrumbLink v-else :href="formatLink(`/${breadcrumb}`)">
                                <template v-if="index === 0">
                                    {{ $t('account.overviewLink') }}
                                </template>
                                <template v-else>
                                    {{ $t(`account.${breadcrumb}Link`) }}
                                </template>
                            </UiBreadcrumbLink>
                        </UiBreadcrumbItem>
                    </slot>
                </template>
            </slot>
        </UiBreadcrumbList>
    </UiBreadcrumb>
</template>
