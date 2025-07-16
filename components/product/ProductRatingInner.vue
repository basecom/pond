<script setup lang="ts">
withDefaults(
    defineProps<{
      ratingAverage?: number;
    }>(),
    {
        ratingAverage: 0,
    },
);
const { getStyle } = usePondStyle();

const maxRating = ref(5);
</script>

<template>
    <template
        v-for="(count, index) in maxRating"
        :key="count"
    >
        <Icon
            name="mdi:star"
            class="size-3 sm:size-4 md:size-5"
            :class="[
                getStyle('product.card.reviews.icon.default'),
                {
                    [getStyle('product.card.reviews.icon.color')]: ratingAverage <= index,
                    [getStyle('product.card.reviews.icon.noColor')]: ratingAverage > index,
                }
            ]"
        />
    </template>
</template>
