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

const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="is-sale-badge">
        <template v-if="isSale">
            <UiBadge :class="getStyle('product.badge.sale.outer')">
                <Icon name="mdi:percent" :class="getStyle('product.badge.sale.icon')" />
            </UiBadge>
        </template>
    </slot>
    <slot name="is-topseller-badge">
        <template v-if="isTopseller">
            <UiBadge :class="getStyle('product.badge.topseller')">
                {{ $t('product.badge.topseller') }}
            </UiBadge>
        </template>
    </slot>
    <slot name="is-new-badge">
        <template v-if="isNew">
            <UiBadge :class="getStyle('product.badge.new')">
                {{ $t('product.badge.new') }}
            </UiBadge>
        </template>
    </slot>
</template>
