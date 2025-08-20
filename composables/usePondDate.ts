export function usePondDate() {
    const { locale } = useI18n();
    const { handleError } = usePondHandleError();

    const formatLocaleDate = (date: string) => {
        if (!date) return undefined;

        try {
            // generate date object
            const dateObject = new Date(date);
            if (isNaN(dateObject.getTime())) {
                handleError('Invalid date format');
                return undefined;
            }

            // formatter for the current locale
            const formatter = new Intl.DateTimeFormat(locale.value, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });

            return formatter.format(dateObject);
        } catch {
            handleError('Invalid date format');
            return undefined;
        }
    };

    return { formatLocaleDate };
}
