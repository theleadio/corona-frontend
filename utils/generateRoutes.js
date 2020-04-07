import { defaultLocale } from './constants';

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});

export const generateRoutes = (locales, countries) => {
  function generateLocaleRoutes(locs, ctys, route) {
    const countryAliases = ctys
      .map(a => a.urlAliases[0])
      .map(alias => route(alias));

    return locs
      .map(a => a.code)
      .map(a => a === defaultLocale ? '' : `/${a}`)
      .map(locale => countryAliases.map(countryAlias => `${locale}/${countryAlias}`))
      .flat();
  }

  const localeRoutes = generateLocaleRoutes(locales, countries, (alias) => `country/${alias}`);

  // Not used currently
  // const shareRecentRoutes = generateLocaleRoutes(locales, countries, (alias) => `share/country-stats-recent/${alias}`);

  return localeRoutes;
};
