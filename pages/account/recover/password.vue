<script setup lang="ts">
const { toast } = usePondToast();
const route = useRoute();
const { t } = useI18n();

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
    <div class="container relative flex justify-center py-4">
        <div class="w-full md:w-2/3 xl:w-1/2">
            <AccountPageRecoverPassword v-if="hashQuery" :hash-query="hashQuery" />
            <AccountPageRecover v-else />
        </div>
    </div>
</template>
