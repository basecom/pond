export function usePondDate() {
    const { locale } = useI18n();

    const formatLocaleDate = (date: string) => {
        if( locale.value === 'de-DE' || locale.value === 'en-GB') {
            return useDateFormat(date, 'DD.MM.YYYY');
        }
    };

    return { formatLocaleDate };
}
