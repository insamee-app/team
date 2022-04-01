import MarkdownIt from 'markdown-it'
import mila from 'markdown-it-link-attributes'

const md = new MarkdownIt()

md.use(mila, {
  pattern: /^\//,
  attrs: {
    'up-target': '[layout-main]',
    'up-instant': 'true',
    'up-preload': 'true',
  },
})

export default md
