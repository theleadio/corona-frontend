import _ from 'lodash'
import en_translations from '@/lang/en'
import ar_translations from '@/lang/ar'
import id_translations from '@/lang/id'
import ja_translations from '@/lang/ja'
import ms_translations from '@/lang/ms'
import pt_br_translations from '@/lang/pt-br'
import vi_translations from '@/lang/vi'
import tl_translations from '@/lang/tl'
import sv_translations from '@/lang/sv'

describe('Translations', () => {
  describe.each([
    ['ar', 'Arabic', ar_translations],
    ['id', 'Bahasa Indonesia', id_translations],
    ['ja', 'Japanese', ja_translations],
    ['ms', 'Bahasa Melayu', ms_translations],
    ['pt-br', 'Portuguese', pt_br_translations],
    ['vi', 'Vietnamese', vi_translations],
    ['tl', 'Tagalog', tl_translations],
    ['sv', 'Svenska', sv_translations],
  ])('in (%s) %s', (languageCode, languageName, languageTranslations) => {
    test('should have the same number of translation entries', () => {
      expect(_.keys(en_translations).length).toBe(_.keys(languageTranslations).length)
    });

    test('should have the same keys', () => {
      _.each(en_translations, (value, key) => {
        if (typeof(value) === 'object') {
          const objectKey = languageTranslations[key];

          _.each(value, (value2, nestedKey) => {
            if (!_.has(objectKey, nestedKey)) {
              console.log(`[${languageCode}] Missing key:`, nestedKey);
            }

            expect(_.has(objectKey, nestedKey)).toBe(true);
          })
        }
        else {
          if (!_.has(languageTranslations, key)) {
            console.log(`[${languageCode}] Missing key:`, key);
          }

          expect(_.has(languageTranslations, key)).toBe(true);
        }
      })
    })
  });
})
