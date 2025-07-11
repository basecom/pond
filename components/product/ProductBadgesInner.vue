<script setup lang="ts">

withDefaults(
    defineProps<{
      isNew?: boolean;
      isTopseller?: boolean;
      isSale?: boolean;
    }>(),
    {
        isNew: false,
        isTopseller: false,
        isSale: false,
    },
);

</script>

<template>
    <template v-if="isSale">
        <UiBadge class="bg-red-500">
            <Icon name="mdi:percent" class="size-4 shrink-0" />
        </UiBadge>
    </template>
    <template v-if="isTopseller">
        <UiBadge class="bg-yellow-500">
            {{ $t('product.badge.topseller') }}
        </UiBadge>
    </template>
    <template v-if="isNew">
        <UiBadge class="bg-green-500">
            {{ $t('product.badge.new') }}
        </UiBadge>
    </template>
</template>
