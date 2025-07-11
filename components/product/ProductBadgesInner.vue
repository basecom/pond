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
    <slot name="is-sale-badge">
        <template v-if="isSale">
            <UiBadge class="bg-red-500">
                <Icon name="mdi:percent" class="size-4 shrink-0" />
            </UiBadge>
        </template>
    </slot>
    <slot name="is-topseller-badge">
        <template v-if="isTopseller">
            <UiBadge class="bg-brown-500">
                {{ $t('product.badge.topseller') }}
            </UiBadge>
        </template>
    </slot>
    <slot name="is-new-badge">
        <template v-if="isNew">
            <UiBadge class="bg-green-600">
                {{ $t('product.badge.new') }}
            </UiBadge>
        </template>
    </slot>
</template>
