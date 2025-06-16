import Styled from './ShowNoticeHtmlContent.styles';

const ShowNoticeHtmlContent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <Styled.Content
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default ShowNoticeHtmlContent;
