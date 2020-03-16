Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth>1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});

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