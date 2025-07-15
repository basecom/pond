/**
 * In the shopware frontends cms-base-layer, translations are injected into the components and provided from the app.vue.
 * In pond, the same code doesn't work because the messages object from useI18n has a different structure, probably due
 * to a version difference. This composable helps by mapping the object to the old structure. If translations for a
 * base-layer cms element are missing, take care to add them using the correct keys.
 */
type CompiledMessage = {
    loc?: {
        source?: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
};

type CompiledMessagesTree = {
    [key: string]: CompiledMessage | CompiledMessagesTree | unknown;
};

type OldMessagesTree = {
    [key: string]: string | OldMessagesTree;
};

const isCompiledMessage = (value: unknown): value is CompiledMessage => typeof value === 'object' && value !== null && 'loc' in value;

const isSourceTextNode = (value: unknown): value is { source: string } => typeof value === 'object' && value !== null && 'source' in value;

export const usePondCmsTranslations = () => {
    const { messages, locale, defaultLocale } = useI18n();

    const mapCompiledToOldFormat = (
        messages: CompiledMessagesTree | CompiledMessage | unknown,
    ): string | OldMessagesTree => {
        if (
            isCompiledMessage(messages) &&
            isSourceTextNode(messages.loc)
        ) {
            return messages.loc.source ?? '';
        }

        if (typeof messages === 'object' && messages !== null) {
            const result: OldMessagesTree = {};
            for (const [key, value] of Object.entries(messages as Record<string, unknown>)) {
                result[key] = mapCompiledToOldFormat(value);
            }
            return result;
        }

        return '';
    };

    const messagesForCurrentLocale =
        messages.value[locale.value as keyof typeof messages.value] ??
        messages.value[defaultLocale];

    const cmsTranslations = computed(() => {
        console.log('messages', messages.value);
            console.log('message', messagesForCurrentLocale);
            return mapCompiledToOldFormat(messagesForCurrentLocale);
    }
    );

    return {
        cmsTranslations,
    };
};
