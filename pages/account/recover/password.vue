<script setup lang="ts">
const { toast } = usePondToast();
const route = useRoute();
const { t } = useI18n();
const { getStyle } = usePondStyle();
const configStore = useConfigStore();
await configStore.loadConfig();

const hashQuery: Ref<undefined | string> = ref(route.query.hash?.toString() || undefined);
const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';

onMounted(() => {
    if(!hashQuery.value) {
        toast({
            title: t('account.recover.errorMessage'),
        });
    }
});

useHead(() => ({
    title: `${t('account.recover.header')  } | ${shopName}`,
}));
</script>

<template>
    <div :class="getStyle('account.recover.page')">
        <AccountPageRecoverPassword v-if="hashQuery" :hash-query="hashQuery" />
        <AccountPageRecover v-else />
    </div>
</template>
