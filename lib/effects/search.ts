type Searchable = {
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  aliases: string[];
};
export function matchesEffect(effect: Searchable, query: string) {
  const normalize = (text: string) => text.normalize('NFKC').toLocaleLowerCase().trim();
  const haystack = normalize(
    [...Object.values(effect.name), ...Object.values(effect.description), ...effect.aliases].join(
      ' ',
    ),
  );
  return normalize(query)
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}
