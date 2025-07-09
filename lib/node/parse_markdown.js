import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

const md = MarkdownIt({ html: true });

md.use(await Shiki({
  fallbackLanguage: 'javascript',
  defaultLanguage: 'javascript',
  themes: {
    light: 'one-dark-pro',
    dark: 'one-dark-pro',
  },
  defaultColor: 'dark',
}));

const parse_markdown = async (string = '', options = {}) => {
  return md.render(string.trim());
};

export default parse_markdown;