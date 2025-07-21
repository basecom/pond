import deDEMessages from './locales/de-DE/de-DE';
import enGBMessages from './locales/en-GB/en-GB';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'de-DE',
    messages: {
        'de-DE': deDEMessages,
        'en-GB': enGBMessages,
    },
}));
