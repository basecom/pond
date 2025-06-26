<script setup lang="ts">
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
    if (typeof selectedLanguageId === 'string') {
        try {
            const response = await changeLanguage(selectedLanguageId);
            const redirectUrl = response.redirectUrl;
            window.location.replace(replaceToDevStorefront(redirectUrl));
        } catch {
            handleError('[Pond][LayoutLanguageSwitchInner] Language switch failed');
        }
    }
};
</script>

<template>
    <UiSelect :default-value="selectedLanguage" @update:model-value="onUpdate">
        <slot name="language-switcher-trigger">
            <UiSelectTrigger class="border-none shadow-none p-0">
                <UiSelectValue />
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
                        <div class="flex items-center gap-1">
                            <template v-if="language.translationCode.code">
                                <Icon :name="`custom-icons:${language.translationCode.code}`" />
                            </template>
                            {{ language.name }}
                        </div>
                    </UiSelectItem>
                </UiSelectGroup>
            </UiSelectContent>
        </slot>
    </UiSelect>
</template>
