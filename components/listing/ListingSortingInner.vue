<script setup lang="ts">
import type { SortingForm } from '~/types/vueForm/Sorting';
import type { SelectItems } from '~/types/vueForm/Form';
import type { Vueform } from '@vueform/vueform';

const props = withDefaults(defineProps<{
      sortingItems?: SelectItems;
      initialValue?: string;
    }>(),
{
    sortingItems: undefined,
    initialValue: undefined,
},
);

defineEmits<{
  onChange: [order: string];
}>();

const form$: Ref<null | Vueform> = ref(null);

onMounted(async () => {
    // Form value is updated, since default-value is not reactive
    form$.value?.update({
        order: props.initialValue,
    });
});
</script>

<template>
    <Vueform
        ref="form$"
        :endpoint="false"
        @change="(value: SortingForm) => $emit('onChange', value.order)"
    >
        <UiSelectElement
            id="listing-sorting"
            name="order"
            :placeholder="$t('general.sortingLabel')"
            :items="sortingItems"
        />
    </Vueform>
</template>
