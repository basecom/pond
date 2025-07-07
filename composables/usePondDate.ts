export function usePondDate() {
    const { locale } = useI18n();
    const { handleError } = usePondHandleError();

    const localeFormats: {[key: string]: string;} = {
        'de-DE': 'DD.MM.YYYY',
        'en-GB': 'DD/MM/YYYY',
    };

    const formatLocaleDate = (date: string) => {
        const format = localeFormats[locale.value];
        if (format) {
            try {
                return useDateFormat(date, format);
            } catch {
                handleError('[Pond][usePondDate]: Invalid date format');
                return undefined;
            }
        }

        return undefined;
    };

    return { formatLocaleDate };
}
