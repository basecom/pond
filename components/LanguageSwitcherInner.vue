<script setup lang="ts">
import languageEmojis from '~/assets/json/languages.json';
import type { AcceptableValue } from 'reka-ui';

const { languages, changeLanguage, replaceToDevStorefront, getAvailableLanguages } =
    useInternationalization();
const { languageIdChain } = useSessionContext();
const { handleError } = usePondHandleError();

onMounted(async () => {
    await getAvailableLanguages();
});

const selectedLanguage = ref(languageIdChain);

const onUpdate = async (selectedLanguageId: AcceptableValue): Promise<void> =>  {
    if(typeof selectedLanguageId === 'string') {
        try {
            const response = await changeLanguage(selectedLanguageId);
            const redirectUrl = response.redirectUrl;
            window.location.replace(replaceToDevStorefront(redirectUrl));
        } catch {
            handleError('Language switch failed');
        }
    }
};

const getEmoji = (isoCode: string) => {
    const language = languageEmojis.find(languageEmoji => languageEmoji.iso_code === isoCode);
    return language?.emoji;
};
</script>

<template>
    <UiSelect :default-value="selectedLanguage" @update:model-value="onUpdate">
        <slot name="language-switcher-trigger">
            <UiSelectTrigger>
                <UiSelectValue  />
            </UiSelectTrigger>
        </slot>

        <slot name="language-switcher-content">
            <UiSelectContent>
                <UiSelectGroup>
                    <UiSelectItem
                        v-for="language in languages"
                        :key="language.id"
                        :value="language.id"
                    >
                        {{ getEmoji(language.translationCode.code) }}
                        {{ language.name }}
                    </UiSelectItem>
                </UiSelectGroup>
            </UiSelectContent>
        </slot>
    </UiSelect>
</template>
