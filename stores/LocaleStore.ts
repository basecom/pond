export const useLocaleStore = defineStore('locale', () => {
    const { getAvailableLanguages } = useInternationalization();

    const loadAvailableLanguages = async () => {
        await getAvailableLanguages();
    };

    return {
        loadAvailableLanguages,
    };
});
