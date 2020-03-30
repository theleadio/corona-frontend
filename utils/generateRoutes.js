import { defaultLocale } from './constants';

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});

export const generateRoutes = (locales, countries) => {
  const countryAliases = countries
    .map(a => a.urlAliases[0])
    .map(alias => `country/${alias}`);

  const localeRoutes = locales
    .map(a => a.code)
    .map(a => a === defaultLocale ? '' : `/${a}`)
    .map(locale => countryAliases.map(countryAlias => `${locale}/${countryAlias}`))
    .flat();

  return localeRoutes;
}
