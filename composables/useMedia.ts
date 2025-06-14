import type { ComputedRef, ImgHTMLAttributes, Ref } from 'vue';
import type { Schemas } from '@shopware/api-client/api-types';

export function useMedia() {
    const { t } = useI18n();

    const thumbnailSizes = {
        xs: 3,
        s: 0,
        m: 1,
        l: 2,
    };

    const getCmsMedia = (width: Ref<number>, height: Ref<number>, imageAttrs: ComputedRef<ImgHTMLAttributes>) => {
        const DEFAULT_THUMBNAIL_SIZE = 10;

        const roundUp = (num: number) => (num ? Math.ceil(num / 100) * 100 : DEFAULT_THUMBNAIL_SIZE);

        const srcPath = computed(() => {
            const biggestParam =
                width.value > height.value ? `width=${roundUp(width.value)}` : `height=${roundUp(height.value)}`;
            return imageAttrs.value.src ? `${imageAttrs.value.src}?${biggestParam}&fit=crop,smart` : undefined;
        });

        return {
            srcPath,
        };
    };

    const getProductCover = (cover: Schemas['Media'] | null | undefined, size: 'xs' | 's' | 'm' | 'l' = 's') => {
        if (!cover) {
            return {
                url: '/fallback-product-cover.svg',
                alt: t('composable.media.noImageMessage'),
                title: t('composable.media.noImageMessage'),
                placeholder: true,
            };
        }

        return {
            url: cover.thumbnails?.length
                ? cover.thumbnails[thumbnailSizes[size]]?.url
                : cover.url,
            alt: cover.translated.alt,
            title: cover.translated.title,
            placeholder: false,
        };
    };

    return { getCmsMedia, getProductCover };
}
