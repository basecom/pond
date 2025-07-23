<script setup lang="ts">
withDefaults(
    defineProps<{
      spinnerClasses?: { [key: string]: boolean };
      isLoading?: boolean;
    }>(),
    {
        spinnerClasses: () => ({}),
        isLoading: false,
    },
);
const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="loading-spinner-wrapper">
        <div 
            :class="[getStyle('cart.layoutLoaderWrapper'), { [getStyle('cart.layoutLoaderDim')]: isLoading } ]"
        >
            <div v-if="isLoading" :class="getStyle('cart.shippingLoader')">
                <slot name="loading-spinner">
                    <Icon name="mdi:loading" :class="[getStyle('ui.button.spinner'), spinnerClasses]" />
                </slot>
            </div>
            <div :class="[$attrs.class, getStyle('cart.layoutLoaderSpinnerContent')]">
                <slot name="loading-spinner-content" />
            </div>
        </div>
    </slot>
</template>
