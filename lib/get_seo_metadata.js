const get_seo_metadata = ({
  site_name = 'Solotrack',
  page_title = '',
  page_description = 'Simple task management for soloists.',
  page_image = '',
}) => {
  return {
    title: `${page_title} | Solotrack`,
    tags: {
      meta: [
        { property: 'og:type', content: 'Website' },
        { property: 'og:site_name', content: site_name },
        { property: 'og:title', content: `${page_title} | Solotrack` },
        {
          property: 'og:description',
          content: page_description,
        },
        {
          property: 'og:image',
          content: page_image || 'https://solotrack.s3.us-east-1.amazonaws.com/seo.png',
        },
      ],
    },
    jsonld: {
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: site_name,
      author: {
        '@type': 'Organization',
        name: 'Solotrack',
      },
      description: page_description,
    },
  };
};

export default get_seo_metadata;
