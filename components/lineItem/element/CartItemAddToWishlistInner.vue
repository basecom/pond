<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const props = withDefaults(
    defineProps<{
      referencedId?: string
    }>(),
    {
        referencedId: undefined,
    },
);

const { getWishlistProducts } = useWishlist();

const {addToWishlist, isInWishlist, removeFromWishlist } = useProductWishlist(props.referencedId ?? '');

getWishlistProducts(); //needs to be called again in cart
</script>
<template>
    <template v-if="isInWishlist">
        <div class="flex" @click="removeFromWishlist">
            <UiButton variant="icon" class="pl-0 pr-2">
                <Icon name="mdi:heart" class="size-5" />
            </UiButton>
            <UiButton variant="link" class="pl-0 text-xs">
                {{ $t('checkout.removeFromWishlist') }}
            </UiButton>
        </div>
    </template>
    <template v-else>
        <div class="flex" @click="addToWishlist">
            <UiButton variant="icon" class="pl-0 pr-2">
                <Icon name="mdi:heart-outline" class="size-5" />
            </UiButton>
            <UiButton variant="link" class="pl-0 text-xs">
                {{ $t('checkout.addToWishlist') }}
            </UiButton>
        </div>
    </template>

</template>
