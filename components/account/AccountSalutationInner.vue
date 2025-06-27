<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      cols?: Columns;
      prefix?: string;
    }>(),
    {
        cols: () => ({
            sm: 12,
            md: 3,
        }),
        prefix: '',
    },
);

const { getSalutations: salutations, fetchSalutations } = useSalutations();

const formattedSalutations: Ref<undefined | { value: string; label: string; }[]> = ref(undefined);

onMounted(async () => {
    await fetchSalutations();
    formattedSalutations.value = salutations.value?.map(item => ({
        value: item.id,
        label: item.displayName,
    }));
});
</script>

<template>
    <slot name="salutation">
        <FormSelectElement
            :id="`${prefix}salutation`"
            :name="`${prefix}salutation`"
            :label="$t('account.customer.salutation.label')"
            :placeholder="$t('account.customer.salutation.placeholder')"
            :messages="{ required: $t('account.customer.salutation.errorRequired') }"
            rules="required"
            :native="false"
            :can-clear="false"
            :items="formattedSalutations"
            :columns="cols"
        />
    </slot>
</template>
