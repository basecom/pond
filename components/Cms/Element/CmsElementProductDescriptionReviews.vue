<script setup lang="ts">
import type { CmsElementProductDescriptionReviews } from '@shopware-pwa/composables-next';
import { getTranslatedProperty } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

const props = defineProps<{
    element: CmsElementProductDescriptionReviews;
}>();
const { product } = useProduct(props.element.data.product);
const propertyGroups = ref<Schemas['PropertyGroup'][]>();

propertyGroups.value = product.value.properties
    .map((obj: Schemas['PropertyGroupOption']) => obj.group)
    .filter(
        (obj: Schemas['PropertyGroup'], index: number, arr: Schemas['PropertyGroup'][]) =>
            arr.findIndex((item: Schemas['PropertyGroup']) => item.id === obj.id) === index,
    );

const getPropertiesOfGroup = (groupId: string): Schemas['PropertyGroupOption'][] =>
    product.value.properties.filter((property: Schemas['PropertyGroupOption']) => property.group.id === groupId);

const getPropertyNamesOfGroup = (groupId: string) => {
    const properties = getPropertiesOfGroup(groupId);

    return properties.map(property => getTranslatedProperty(property, 'name'));
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="text-xl font-bold">{{ $t('cms.element.product.descriptionHeading') }}</div>
        <div class="flex flex-col gap-8 md:flex-row">
            <!-- v-html is necessary because we need to render html -->
            <!-- eslint-disable vue/no-v-html -->
            <div
                class="cms_html grow"
                v-html="getTranslatedProperty(product, 'description')"
            />

            <div class="w-full shrink-0 md:w-96">
                <table class="w-full table-auto">
                    <tbody>
                        <tr
                            v-for="(group, index) in propertyGroups"
                            :key="`group-${group.id}`"
                            :class="{
                                'bg-gray-light': index % 2 === 0,
                            }"
                        >
                            <td class="px-4 py-2 font-bold">{{ getTranslatedProperty(group, 'name') }}</td>
                            <td class="px-4 py-2">
                                {{ getPropertyNamesOfGroup(group.id).join(', ') }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
