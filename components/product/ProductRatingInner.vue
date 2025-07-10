<script setup lang="ts">
withDefaults(
    defineProps<{
      ratingAverage?: number;
    }>(),
    {
        ratingAverage: 0,
    },
);

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
            :class="{
                'text-gray-500': ratingAverage <= index,
                'text-yellow-500': ratingAverage > index
            }"
        />
    </template>
</template>
