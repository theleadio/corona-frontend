export const generateRoutes = (locales, countries) => {
  const countryAliases = countries
    .map(a => a.urlAliases)
    .flat()
    .map(alias => `country/${alias}`);

  const localeRoutes = locales
    .map(a => a.code)
    .map(c => {
      return countryAliases.map(a => `${c}/${a}`);
    })
    .flat();

  return countryAliases.concat(localeRoutes);
}