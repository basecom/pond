<script setup lang="ts">
import type { SortingForm } from '~/types/vueForm/Sorting';
import type { SelectItems } from '~/types/vueForm/Form';
import type { Vueform } from '@vueform/vueform';

withDefaults(defineProps<{
      sortingItems?: SelectItems;
      initialValue?: string;
      isLoading?: boolean;
    }>(),
{
    sortingItems: undefined,
    initialValue: undefined,
    isLoading: false,
},
);

defineEmits<{
  onChange: [order: string];
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <UiSkeleton v-if="isLoading" :class="getStyle('listing.sorting.skeleton')" />
    <Vueform
        v-else
        :endpoint="false"
        @change="(value: SortingForm) => $emit('onChange', value.order)"
    >
        <UiSelectElement
            id="listing-sorting"
            name="order"
            :placeholder="$t('general.sortingLabel')"
            :items="sortingItems"
            :default-value="initialValue"
        />
    </Vueform>
</template>
