import fuzzysort from 'fuzzysort';

const search_index = (cache_name = '', search_query = '', search_options = {}) => {
  let filtered_index = process.caches[cache_name] || [];

  // tags flattening?

  if (search_options?.modifiers?.length > 0) {
    for (let i = 0; i < search_options?.modifiers?.length; i += 1) {
      const modifier = search_options?.modifiers[i];
      filtered_index = filtered_index.map(modifier);
    }
  }

  if (search_options?.filters?.length > 0) {
    for (let i = 0; i < search_options?.filters?.length; i += 1) {
      const filter = search_options?.filters[i];
      filtered_index = filtered_index.filter(filter);
    }
  }

  const results = fuzzysort.go(search_query, filtered_index, search_options);
  return results.map((result) => {
    return {
      _id: result?.obj?._id,
      score: result?.score,
      highlight: fuzzysort.highlight(result['0'], '<strong>', '</strong>'),
      ...result.obj,
    };
  });
};

export default search_index;
