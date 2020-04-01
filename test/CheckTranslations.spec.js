import _ from 'lodash'
import ar_translations from '@/lang/ar'
import en_translations from '@/lang/en'
import en_mx_translations from '@/lang/es-mx'
import id_translations from '@/lang/id'
import ja_translations from '@/lang/ja'
import ms_translations from '@/lang/ms'
import my_translations from '@/lang/my'
import pt_br_translations from '@/lang/pt-br'
import sv_translations from '@/lang/sv'
import ta_translations from '@/lang/ta'
import tl_translations from '@/lang/tl'
import vi_translations from '@/lang/vi'

describe('Translations', () => {
    describe('in Arabic (ar)', () => {
        test('should have the same number of translation entries', () => {
            expect(_.keys(en_translations).length).toBe(_.keys(ar_translations).length)
        })

        test('should have the same keys', () => {
            _.each(en_translations, (value, key) => {
                if (typeof(value) === "object") {
                    let objectKey = ar_translations[key]
                    _.each(value, (value2, nestedKey) => {
                        if (!_.has(objectKey, nestedKey)) {
                            console.log('[ar] Missing key:', nestedKey);
                        }

                        expect(_.has(objectKey, nestedKey)).toBe(true)
                    })
                }
                else {
                    if (!_.has(ar_translations, key)) {
                        console.log('[ar] Missing key:', key);
                    }

                    expect(_.has(ar_translations, key)).toBe(true);
                }
            })
        })
    })

    describe('in Spanish mexican (id)', () => {
      test('should have the same number of translation entries', () => {
          expect(_.keys(en_translations).length).toBe(_.keys(en_mx_translations).length)
      })

      test('should have the same keys', () => {
          _.each(en_translations, (value, key) => {
              if (typeof(value) === "object") {
                  let objectKey = en_mx_translations[key]
                  _.each(value, (value2, nestedKey) => {
                      if (!_.has(objectKey, nestedKey)) {
                          console.log('[id] Missing key:', nestedKey);
                      }

                      expect(_.has(objectKey, nestedKey)).toBe(true)
                  })
              }
              else {
                  if (!_.has(en_mx_translations, key)) {
                      console.log('[id] Missing key:', key);
                  }

                  expect(_.has(en_mx_translations, key)).toBe(true);
              }
          })
      })
  })

    describe('in Bahasa Indonesia (id)', () => {
        test('should have the same number of translation entries', () => {
            expect(_.keys(en_translations).length).toBe(_.keys(id_translations).length)
        })

        test('should have the same keys', () => {
            _.each(en_translations, (value, key) => {
                if (typeof(value) === "object") {
                    let objectKey = id_translations[key]
                    _.each(value, (value2, nestedKey) => {
                        if (!_.has(objectKey, nestedKey)) {
                            console.log('[id] Missing key:', nestedKey);
                        }

                        expect(_.has(objectKey, nestedKey)).toBe(true)
                    })
                }
                else {
                    if (!_.has(id_translations, key)) {
                        console.log('[id] Missing key:', key);
                    }

                    expect(_.has(id_translations, key)).toBe(true);
                }
            })
        })
    })

    describe('in Japanese (ja)', () => {
        test('should have the same number of translation entries', () => {
            expect(_.keys(en_translations).length).toBe(_.keys(ja_translations).length)
        })

        test('should have the same keys', () => {
            _.each(en_translations, (value, key) => {
                if (typeof(value) === "object") {
                    let objectKey = ja_translations[key]
                    _.each(value, (value2, nestedKey) => {
                        if (!_.has(objectKey, nestedKey)) {
                            console.log('[ja] Missing key:', nestedKey);
                        }

                        expect(_.has(objectKey, nestedKey)).toBe(true)
                    })
                }
                else {
                    if (!_.has(ja_translations, key)) {
                        console.log('[ja] Missing key:', key);
                    }

                    expect(_.has(ja_translations, key)).toBe(true);
                }
            })
        })
    })

    describe('in Bahasa Melayu', () => {
        test('should have the same number of translation entries', () => {
            expect(_.keys(en_translations).length).toBe(_.keys(ms_translations).length)
        })

        test('should have the same keys', () => {
            _.each(en_translations, (value, key) => {
                if (typeof(value) === "object") {
                    let objectKey = ms_translations[key]
                    _.each(value, (value2, nestedKey) => {
                        if (!_.has(objectKey, nestedKey)) {
                            console.log('[ms] Missing key:', nestedKey);
                        }

                        expect(_.has(objectKey, nestedKey)).toBe(true)
                    })
                }
                else {
                    if (!_.has(ms_translations, key)) {
                        console.log('[ms] Missing key:', key);
                    }

                    expect(_.has(ms_translations, key)).toBe(true);
                }
            })
        })
    })

    describe('in Burmese', () => {
      test('should have the same number of translation entries', () => {
          expect(_.keys(en_translations).length).toBe(_.keys(my_translations).length)
      })

      test('should have the same keys', () => {
          _.each(en_translations, (value, key) => {
              if (typeof(value) === "object") {
                  let objectKey = my_translations[key]
                  _.each(value, (value2, nestedKey) => {
                      if (!_.has(objectKey, nestedKey)) {
                          console.log('[pt-br] Missing key:', nestedKey);
                      }

                      expect(_.has(objectKey, nestedKey)).toBe(true)
                  })
              }
              else {
                  if (!_.has(pt_br_translations, key)) {
                      console.log('[pt-br] Missing key:', key);
                  }

                  expect(_.has(pt_br_translations, key)).toBe(true);
              }
          })
      })
  })

    describe('in Portuguese (pt-br)', () => {
        test('should have the same number of translation entries', () => {
            expect(_.keys(en_translations).length).toBe(_.keys(pt_br_translations).length)
        })

        test('should have the same keys', () => {
            _.each(en_translations, (value, key) => {
                if (typeof(value) === "object") {
                    let objectKey = pt_br_translations[key]
                    _.each(value, (value2, nestedKey) => {
                        if (!_.has(objectKey, nestedKey)) {
                            console.log('[pt-br] Missing key:', nestedKey);
                        }

                        expect(_.has(objectKey, nestedKey)).toBe(true)
                    })
                }
                else {
                    if (!_.has(pt_br_translations, key)) {
                        console.log('[pt-br] Missing key:', key);
                    }

                    expect(_.has(pt_br_translations, key)).toBe(true);
                }
            })
        })
    })

    describe('in Svenska (sv)', () => {
      test('should have the same number of translation entries', () => {
        expect(_.keys(en_translations).length).toBe(_.keys(sv_translations).length)
      })

      test('should have the same keys', () => {
        _.each(en_translations, (value, key) => {
          if (typeof(value) === "object") {
            let objectKey = sv_translations[key]
            _.each(value, (value2, nestedKey) => {
              if (!_.has(objectKey, nestedKey)) {
                console.log('[sv] Missing key:', nestedKey);
              }

              expect(_.has(objectKey, nestedKey)).toBe(true)
            })
          }
          else {
            if (!_.has(sv_translations, key)) {
              console.log('[sv] Missing key:', key);
            }

            expect(_.has(sv_translations, key)).toBe(true);
          }
        })
      })
    })

    describe('in Tamil (ta)', () => {
      test('should have the same number of translation entries', () => {
        expect(_.keys(en_translations).length).toBe(_.keys(ta_translations).length)
      })

      test('should have the same keys', () => {
        _.each(en_translations, (value, key) => {
          if (typeof(value) === "object") {
            let objectKey = ta_translations[key]
            _.each(value, (value2, nestedKey) => {
              if (!_.has(objectKey, nestedKey)) {
                console.log('[tl] Missing key:', nestedKey);
              }

              expect(_.has(objectKey, nestedKey)).toBe(true)
            })
          }
          else {
            if (!_.has(ta_translations, key)) {
              console.log('[tl] Missing key:', key);
            }

            expect(_.has(ta_translations, key)).toBe(true);
          }
        })
      })
    })

    describe('in Tagalog (tl)', () => {
      test('should have the same number of translation entries', () => {
        expect(_.keys(en_translations).length).toBe(_.keys(tl_translations).length)
      })

      test('should have the same keys', () => {
        _.each(en_translations, (value, key) => {
          if (typeof(value) === "object") {
            let objectKey = tl_translations[key]
            _.each(value, (value2, nestedKey) => {
              if (!_.has(objectKey, nestedKey)) {
                console.log('[tl] Missing key:', nestedKey);
              }

              expect(_.has(objectKey, nestedKey)).toBe(true)
            })
          }
          else {
            if (!_.has(tl_translations, key)) {
              console.log('[tl] Missing key:', key);
            }

            expect(_.has(tl_translations, key)).toBe(true);
          }
        })
      })
    })

    describe('in Vietnamese (vi)', () => {
        test('should have the same number of translation entries', () => {
            expect(_.keys(en_translations).length).toBe(_.keys(vi_translations).length)
        })

        test('should have the same keys', () => {
            _.each(en_translations, (value, key) => {
                if (typeof(value) === "object") {
                    let objectKey = vi_translations[key]
                    _.each(value, (value2, nestedKey) => {
                        if (!_.has(objectKey, nestedKey)) {
                            console.log('[vi] Missing key:', nestedKey);
                        }

                        expect(_.has(objectKey, nestedKey)).toBe(true)
                    })
                }
                else {
                    if (!_.has(vi_translations, key)) {
                        console.log('[vi] Missing key:', key);
                    }

                    expect(_.has(vi_translations, key)).toBe(true);
                }
            })
        })
    })
})
