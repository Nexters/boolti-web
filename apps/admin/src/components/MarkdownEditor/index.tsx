import { TrashIcon, YoutubeLinkIcon } from '@boolti/icon';
import {
  MDXEditor,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  toolbarPlugin,
  listsPlugin,
  thematicBreakPlugin,
  BlockTypeSelect,
  tablePlugin,
  linkPlugin,
  linkDialogPlugin,
  CreateLink,
  markdownShortcutPlugin,
  imagePlugin,
  InsertImage,
  directivesPlugin,
  usePublisher,
  insertDirective$,
  DialogButton,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  DirectiveDescriptor,
  quotePlugin,
} from '@mdxeditor/editor';
import { useUploadShowContentImage } from '@boolti/api';
import { useTranslation } from 'react-i18next';

import Styled from './MarkdownEditor.styles';

const YoutubeDirectiveDescriptor: DirectiveDescriptor = {
  name: 'youtube',
  type: 'leafDirective',
  testNode(node) {
    return node.name === 'youtube';
  },
  attributes: ['id'],
  hasChildren: false,
  Editor: ({ mdastNode, lexicalNode, parentEditor }) => {
    return (
      <Styled.YoutubeEmbedContainer>
        <Styled.YoutubeEmbedDeleteButton
          onClick={() => {
            parentEditor.update(() => {
              lexicalNode.selectNext();
              lexicalNode.remove();
            });
          }}
        >
          <TrashIcon />
        </Styled.YoutubeEmbedDeleteButton>
        <iframe
          width="100%"
          style={{
            aspectRatio: '16 / 9',
          }}
          src={`https://www.youtube.com/embed/${mdastNode.attributes?.id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </Styled.YoutubeEmbedContainer>
    );
  },
};

const InsertYoutubeVideo = () => {
  const insertDirective = usePublisher(insertDirective$);
  const { t } = useTranslation();

  return (
    <DialogButton
      tooltipTitle={t('toolbar.youtube')}
      submitButtonTitle={t('youtube.urlPlaceholder')}
      dialogInputPlaceholder={t('youtube.urlPlaceholder')}
      buttonContent={<YoutubeLinkIcon />}
      onSubmit={(url) => {
        try {
          const videoId = new URL(url).searchParams.get('v');

          if (videoId) {
            insertDirective({
              name: 'youtube',
              type: 'leafDirective',
              attributes: { id: videoId },
            });
          } else {
            throw new Error('Invalid URL');
          }
        } catch (error) {
          alert(t('youtube.invalidMessage'));
        }
      }}
    />
  );
};

interface MarkdownEditorProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  placeholder,
  disabled,
  hasError,
  onChange,
  onBlur,
}) => {
  const { t } = useTranslation();
  const uploadShowContentImageMutation = useUploadShowContentImage();

  return (
    <Styled.MarkdownEditorContainer disabled={disabled} hasError={hasError}>
      <MDXEditor
        className="mdx-editor"
        contentEditableClassName="prose"
        markdown={value}
        placeholder={
          <Styled.MarkdownEditorPlaceholder>{placeholder}</Styled.MarkdownEditorPlaceholder>
        }
        translation={(key, _defaultValue, interpolations) => t(key, interpolations)}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <Separator />
                <ListsToggle options={['number', 'bullet']} />
                <InsertThematicBreak />
                <Separator />
                <InsertYoutubeVideo />
                <CreateLink />
                <InsertImage />
              </>
            ),
          }),
          headingsPlugin({
            allowedHeadingLevels: [1, 2, 3],
          }),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          tablePlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          markdownShortcutPlugin(),
          imagePlugin({
            imageUploadHandler: (file) => {
              const imageFile = {
                ...file,
                preview: URL.createObjectURL(file),
              };
              return uploadShowContentImageMutation.mutateAsync(imageFile);
            },
          }),
          directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor] }),
        ]}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Styled.MarkdownEditorContainer>
  );
};

export default MarkdownEditor;
