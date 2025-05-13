<script setup lang="ts">
import {toast} from '../../ui/toast';
const { t } = useI18n();
withDefaults(
    defineProps<{
      referencedId?: string
    }>(),
    {
        referencedId: undefined,
    },
);

const { getWishlistProducts } = useWishlist();

const {addToWishlist, isInWishlist, removeFromWishlist } = useProductWishlist(props.referencedId ?? '');

const isLoading = ref(false);

const addProductToWishlist = async () => {
    try {
        isLoading.value = true;
        await addToWishlist();
        toast({
            description: t('checkout.success'),
        });
    } catch(error: Error) {
        toast({
            title: t('error.generalHeadline'),
            description: t(`error.${ error.details.errors[0]?.code}`),
            variant: 'destructive',
        });
    }
    isLoading.value = false;
};
const removeProductFromWishlist = async () => {
    try {
        isLoading.value = true;
        await removeFromWishlist();
        toast({
            description: t('checkout.success'),
        });
    } catch(error: Error) {
        toast({
            title: t('error.generalHeadline'),
            description: t(`error.${ error.details.errors[0]?.code}`),
            variant: 'destructive',
        });
    }
    isLoading.value = false;
};

getWishlistProducts(); //needs to be called again in cart
</script>
<template>
    <template v-if="isInWishlist">
        <slot name="addWishlistWrapper">
            <div class="flex" @click="removeProductFromWishlist">
                <slot name="removeFromWishlistButton">
                    <UiButton variant="icon" class="pl-0 pr-2">
                        <slot name="iconInWishlist">
                            <Icon name="mdi:heart" class="size-5" />
                        </slot>
                    </UiButton>
                    <UiButton variant="link" class="pl-0 text-xs" :is-loading="isLoading">
                        {{ $t('checkout.removeFromWishlist') }}
                    </UiButton>
                </slot>
            </div>
        </slot>
    </template>
    <template v-else>
        <slot name="removeWishlistWrapper">
            <div class="flex" @click="addProductToWishlist">
                <slot name="removeFromWishlistButton">
                    <UiButton variant="icon" class="pl-0 pr-2">
                        <slot name="iconNotInWishlist">
                            <Icon name="mdi:heart-outline" class="size-5" />
                        </slot>
                    </UiButton>
                    <UiButton variant="link" class="pl-0 text-xs" :is-loading="isLoading">
                        {{ $t('checkout.addToWishlist') }}
                    </UiButton>
                </slot>
            </div>
        </slot>
    </template>

</template>
