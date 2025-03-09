import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { visit } from 'unist-util-visit'
import { Root } from 'mdast'
import remarkDirective from 'remark-directive'
import Styled from './ShowContentMarkdown.styles'

interface ShowContentMarkdownProps {
  content: string
}

function remarkYoutubePlugin() {
  return (tree: Root) => {
    visit(tree, function (node) {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name !== 'youtube') return

        const data = node.data || (node.data = {})
        const attributes = node.attributes || {}
        const id = attributes.id

        data.hName = 'iframe'
        data.hProperties = {
          src: 'https://www.youtube.com/embed/' + id,
          width: '100%',
          style: 'aspectRatio: 16 / 9',
          frameBorder: 0,
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
          allowFullScreen: true
        }
      }
    })
  }
}

const ShowContentMarkdown: React.FC<ShowContentMarkdownProps> = ({ content }) => {
  return (
    <Styled.MarkdownContent>
      <Markdown
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          a: ({ node, ...props }) => {
            let href = props.href ?? '';

            // URL에 프로토콜이 없는 경우 https://를 추가
            if (href && !href.match(/^https?:\/\//)) {
              href = `https://${href}`;
            }

            try {
              const url = new URL(href).toString();
              return <a {...props} href={url} target="_blank" rel="noopener nofollow noreferrer" />;
            } catch (e) {
              return <a {...props} href={href} target="_blank" rel="noopener nofollow noreferrer" />;
            }
          }
        }}
        remarkRehypeOptions={{ passThrough: ['link'] }}
        remarkPlugins={[remarkDirective, remarkYoutubePlugin]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </Markdown>
    </Styled.MarkdownContent>
  )
}

export default ShowContentMarkdown
