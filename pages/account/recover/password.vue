<script setup lang="ts">
const { toast } = usePondToast();
const route = useRoute();
const { t } = useI18n();
const { getStyle } = usePondStyle();

const hashQuery: Ref<undefined | string> = ref(route.query.hash?.toString() || undefined);

onMounted(() => {
    if(!hashQuery.value) {
        toast({
            title: t('account.recover.errorMessage'),
        });
    }
});

</script>

<template>
    <div :class="getStyle('account.recover.page')">
        <AccountPageRecoverPassword v-if="hashQuery" :hash-query="hashQuery" />
        <AccountPageRecover v-else />
    </div>
</template>
