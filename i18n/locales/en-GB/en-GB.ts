export default defineI18nLocale(async () => {
    const { getSnippets } = usePondSnippets();
    const url = useRequestURL();
    let urlString = `${url.origin}${url.pathname}`;

    // Removes the last "/" if present
    urlString = urlString.replace(/\/$/, '');
    return await getSnippets(urlString);
});
