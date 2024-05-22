import en from './src/lang/en';
import fr from './src/lang/fr';

export default defineI18nConfig(() => ({
  legacy: false,
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  messages: {
    en,
    fr,
  }
}))
