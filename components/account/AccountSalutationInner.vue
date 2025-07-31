<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      columns?: Columns;
      /**
       * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
       * are unique upon submission, it is possible to specify a prefix
       */
      prefix?: string;
    }>(),
    {
        columns: () => ({
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
        <UiSelectElement
            :id="`${prefix}salutationId`"
            :name="`${prefix}salutationId`"
            :label="$t('account.personalSalutationLabel')"
            :placeholder="$t('account.personalSalutationPlaceholder')"
            :messages="{ required: $t('account.personalSalutationRequired') }"
            rules="required"
            :items="formattedSalutations"
            :columns="columns"
        />
    </slot>
</template>
