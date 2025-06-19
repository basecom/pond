/**
 * In the shopware frontends cms-base-layer, translations are injected into the components and provided from the app.vue.
 * In pond, the same code doesn't work because the messages object from useI18n has a different structure, probably due
 * to a version difference. This composable helps by mapping the object to the old structure. If translations for a
 * base-layer cms element are missing, take care to add them using the correct keys.
 */
type CompiledMessage = {
    type: number;
    body: {
        type: number;
        static: string;
        items: any[];
        [key: string]: any;
    };
    [key: string]: any;
};

type CompiledMessagesTree = {
    [key: string]: CompiledMessage | CompiledMessagesTree;
};

export const usePondCmsTranslations = () => {
    const { messages, locale, defaultLocale } = useI18n();

    const flattenCompiledTranslations = (messages: CompiledMessagesTree | CompiledMessage): any => {
        if (
            typeof messages === 'object' &&
            'body' in messages &&
            typeof messages.body?.static === 'string'
        ) {
            return messages.body.static;
        }

        if (typeof messages === 'object' && messages !== null) {
            const result: any = {};
            for (const key in messages) {
                result[key] = flattenCompiledTranslations(messages[key] as any);
            }
            return result;
        }

        return messages;
    };

    const cmsTranslations = computed(() =>
        flattenCompiledTranslations(
            messages.value[locale.value as keyof typeof messages.value] ??
            messages.value[defaultLocale] ??
            {},
        ),
    );

    return {
        cmsTranslations,
    };
};
