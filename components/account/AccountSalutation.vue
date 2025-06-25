<script setup lang="ts">
const { getSalutations: salutations, fetchSalutations } = useSalutations();

const formattedSalutations = ref(undefined);

onMounted(async () => {
    await fetchSalutations();
    formattedSalutations.value = salutations.value?.map(item => ({
        value: item.id,
        label: item.displayName,
    }));
});
</script>

<template>
    <SelectElement
        name="salutation"
        :label="$t('account.customer.salutation.label')"
        :placeholder="$t('account.customer.salutation.placeholder')"
        :messages="{ required: $t('account.customer.salutation.errorRequired') }"
        rules="required"
        :native="false"
        :can-clear="false"
        :items="formattedSalutations"
    />
</template>
