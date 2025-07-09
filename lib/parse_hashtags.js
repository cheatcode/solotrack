const parse_hashtags = (text) => {
  const hashtag_pattern = /#\w+/g;
  const hashtags = text.match(hashtag_pattern) || [];
  
  const task = text.replace(hashtag_pattern, '').replace(/\s+/g, ' ').trim();
  
  const tags = hashtags.map(tag => tag.substring(1));
  
  return {
    tags,
    task
  };
};

export default parse_hashtags;
