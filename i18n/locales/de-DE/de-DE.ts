export default defineI18nLocale(async () => {
    const { getSnippets } = usePondSnippets();
    const url = useRequestURL();

    return await getSnippets(url.origin);
});
