import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Quill, { Range as QuillRange } from 'quill';
import { useUploadShowContentImage } from '@boolti/api';
import Styled from './QuillEditor.styles';
import './blot';
import { useDialog } from '@boolti/ui';
import YoutubeUrlDialogContent from '../YoutubeUrlDialogContent';
import LinkFormDialogContent, { LinkFormInputs } from '../LinkFormDialogContent';

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  error?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (isEmpty: boolean) => void;
}

const QuillEditor: React.FC<EditorProps> = ({
  readOnly = false,
  defaultValue = null,
  placeholder = '',
  error = false,
  onChange,
  onBlur,
}) => {
  const editorElementRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const readOnlyRef = useRef<boolean | null>(readOnly);
  const defaultValueRef = useRef<string | null>(defaultValue);
  const placeholderRef = useRef<string | null>(placeholder);
  const errorRef = useRef<boolean | null>(error);
  const onChangeRef = useRef(onChange);
  const onBlurRef = useRef(onBlur);
  const selectedLinkRangeRef = useRef<{ index: number; length: number } | null>(null);

  const uploadShowContentImageMutation = useUploadShowContentImage();

  const youtubeUrlDialog = useDialog();
  const linkDialog = useDialog();

  const imageUploadHandler = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (!input.files || input.files.length === 0 || !quillRef.current) return;

      const file = input.files[0];
      const url = await uploadShowContentImageMutation.mutateAsync({
        ...file,
        preview: URL.createObjectURL(file),
      });
      const range = quillRef.current.getSelection();

      if (range?.index === undefined) return;
      quillRef.current.insertEmbed(range.index, 'image', url);
    };
    input.click();
  }, [uploadShowContentImageMutation]);

  const youtubeUrlSubmitHandler = useCallback(
    (url: string) => {
      if (!quillRef.current) return;

      youtubeUrlDialog.close();
      const embedUrl = url.replace('watch?v=', 'embed/');
      quillRef.current.focus();
      const range = quillRef.current.getSelection();
      if (range?.index === undefined) return;
      quillRef.current.insertEmbed(range.index, 'video', embedUrl);
    },
    [youtubeUrlDialog, quillRef],
  );

  const linkSubmitHandler = useCallback(
    (data: LinkFormInputs) => {
      if (!quillRef.current) return;

      linkDialog.close();
      quillRef.current.focus();
      const range = quillRef.current.getSelection();

      if (range?.index === undefined) return;

      quillRef.current.focus();

      if (range.length === 0) {
        quillRef.current.insertText(range.index, data.title, 'user');
        quillRef.current.setSelection(range.index, data.title.length);
        quillRef.current.formatText(range.index, data.title.length, 'link', data.link);
        quillRef.current.setSelection(range.index + data.title.length, 0);

        return;
      }

      quillRef.current.formatText(range.index, range.length, 'link', data.link);
      quillRef.current.setSelection(range.index + range.length, 0);
    },
    [quillRef, linkDialog],
  );

  const linkEditSubmitHandler = useCallback(
    (data: LinkFormInputs) => {
      if (!quillRef.current || !selectedLinkRangeRef.current) return;

      const { index, length } = selectedLinkRangeRef.current;

      linkDialog.close();
      quillRef.current.formatText(index, length, 'link', data.link);
      quillRef.current.setSelection(index + length, 0);
      selectedLinkRangeRef.current = null;
    },
    [quillRef, linkDialog],
  );

  const linkDeleteHandler = useCallback(() => {
    if (!quillRef.current || !selectedLinkRangeRef.current) return;

    const { index, length } = selectedLinkRangeRef.current;

    linkDialog.close();
    quillRef.current.formatText(index, length, 'link', false);
    quillRef.current.setSelection(index + length, 0);
    selectedLinkRangeRef.current = null;
  }, [quillRef, linkDialog]);

  const openLinkEditDialog = useCallback(
    (linkInfo: { title: string; link: string; index: number; length: number }) => {
      if (!quillRef.current) return;

      quillRef.current.blur();

      selectedLinkRangeRef.current = { index: linkInfo.index, length: linkInfo.length };

      linkDialog.open({
        title: '링크 수정',
        isBackdropClosable: true,
        content: (
          <LinkFormDialogContent
            defaultValues={{ title: linkInfo.title, link: linkInfo.link }}
            onSubmit={linkEditSubmitHandler}
            onDelete={linkDeleteHandler}
          />
        ),
      });
    },
    [quillRef, linkDialog, linkEditSubmitHandler, linkDeleteHandler],
  );

  const openYoutubeUrlDialog = useCallback(async () => {
    if (!quillRef.current) return;

    quillRef.current.blur();

    youtubeUrlDialog.open({
      title: '유튜브 영상 업로드',
      isBackdropClosable: true,
      content: <YoutubeUrlDialogContent onSubmit={youtubeUrlSubmitHandler} />,
    });
  }, [quillRef, youtubeUrlDialog, youtubeUrlSubmitHandler]);

  const openLinkFormDialog = useCallback(() => {
    if (!quillRef.current) return;

    const range = quillRef.current.getSelection();
    let defaultValues: LinkFormInputs | undefined;

    if (range && range.length > 0) {
      const selectedText = quillRef.current.getText(range.index, range.length);
      const format = quillRef.current.getFormat(range.index, range.length);
      const existingLink = typeof format.link === 'string' ? format.link : '';

      defaultValues = {
        title: selectedText.trim(),
        link: existingLink,
      };
    }

    quillRef.current.blur();

    linkDialog.open({
      title: '링크 업로드',
      isBackdropClosable: true,
      content: <LinkFormDialogContent defaultValues={defaultValues} onSubmit={linkSubmitHandler} />,
    });
  }, [quillRef, linkDialog, linkSubmitHandler]);

  useLayoutEffect(() => {
    readOnlyRef.current = readOnly;
    defaultValueRef.current = defaultValue;
    placeholderRef.current = placeholder;
    errorRef.current = error;
    onChangeRef.current = onChange;
    onBlurRef.current = onBlur;
  });

  useEffect(() => {
    quillRef.current?.enable(!readOnly);
  }, [quillRef, readOnly]);

  useEffect(() => {
    const editorElement = editorElementRef.current;
    if (!editorElement) return;

    quillRef.current = new Quill(editorElement, {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }, 'bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }, 'blockquote'],
            ['image', 'link', 'video'],
          ],
          handlers: {
            image: imageUploadHandler,
            video: openYoutubeUrlDialog,
            link: openLinkFormDialog,
          },
        },
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              collapsed: true,
              handler: (range: QuillRange) => {
                if (!quillRef.current || !document.activeElement) return;

                const selection = document.getSelection();
                selection?.removeAllRanges();
                quillRef.current.setSelection(range.index, 0);

                /*
                 * iOS 웹 브라우저 환경에서 발생하는 한글 IME 입력 버퍼 이슈를 해결하기 위한 코드
                 * Selection.addRange 실행 시 일부러 에러를 발생시켜, 강제로 버퍼를 비우게 한다.
                 * try catch 문으로 wrap하면 버퍼가 비워지지 않으니 주의할 것.
                 */
                selection?.addRange({} as Range);

                quillRef.current.insertText(range.index, '\n');
                quillRef.current.focus();

                return false;
              },
            },
          },
        },
      },
      placeholder,
      readOnly,
      theme: 'snow',
    });

    if (defaultValueRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(defaultValueRef.current);
    }

    let typingTimer: ReturnType<typeof setTimeout> | null = null;

    quillRef.current.on(Quill.events.TEXT_CHANGE, (delta, _oldDelta, source) => {
      if (!quillRef.current) return;

      if (source === 'user') {
        if (typingTimer) {
          clearTimeout(typingTimer);
        }

        const ops = delta.ops || [];
        const hasSpaceOrNewline = ops.some(
          (op) =>
            op.insert &&
            typeof op.insert === 'string' &&
            (op.insert.includes(' ') || op.insert.includes('\n')),
        );

        if (hasSpaceOrNewline) {
          typingTimer = setTimeout(() => {
            const selection = quillRef.current!.getSelection();
            if (!selection) return;

            const fullText = quillRef.current!.getText();
            const beforeCursor = fullText.substring(0, selection.index);

            const urlRegex = /(https?:\/\/[^\s]+)/g;
            let match;

            while ((match = urlRegex.exec(beforeCursor)) !== null) {
              const url = match[0];
              const startIndex = match.index;

              const format = quillRef.current!.getFormat(startIndex, url.length);
              if (!format.link) {
                quillRef.current!.formatText(startIndex, url.length, 'link', url);
              }
            }
          }, 0);
        }
      }

      onChangeRef.current?.(quillRef.current.root.innerHTML);
    });

    quillRef.current.root.addEventListener('blur', () => {
      if (!quillRef.current) return;
      const text = quillRef.current.getText().trim();
      onBlurRef.current?.(!text);
    });

    // 한글 입력 IME 입력 이벤트 감지 및 강제 리렌더링
    quillRef.current.root.addEventListener('compositionstart', () => {
      setTimeout(() => {
        quillRef.current?.root.classList.remove('ql-blank');
      }, 0);
    });

    quillRef.current.root.addEventListener('input', () => {
      setTimeout(() => {
        if (quillRef.current?.root.innerText.trim() === '') {
          quillRef.current.root.classList.add('ql-blank');
        } else {
          quillRef.current?.root.classList.remove('ql-blank');
        }
      }, 0);
    });

    // 링크 클릭 이벤트 핸들러
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && quillRef.current) {
        event.preventDefault();

        const linkElement = target as HTMLAnchorElement;
        const linkUrl = linkElement.getAttribute('href') || '';
        const linkText = linkElement.textContent || '';

        // Quill에서 링크의 위치 찾기
        const blot = Quill.find(linkElement);
        if (blot && !(blot instanceof Quill)) {
          const index = quillRef.current.getIndex(blot);
          const length = linkText.length;

          openLinkEditDialog({
            title: linkText,
            link: linkUrl,
            index,
            length,
          });
        }
      }
    };

    quillRef.current.root.addEventListener('click', handleLinkClick);

    return () => {
      if (typingTimer) {
        clearTimeout(typingTimer);
      }
      if (quillRef.current) {
        quillRef.current.off(Quill.events.TEXT_CHANGE);
        quillRef.current.root.removeEventListener('blur', () => {
          if (!quillRef.current) return;
          const text = quillRef.current.getText().trim();
          onBlurRef.current?.(!text);
        });
        quillRef.current.root.removeEventListener('click', handleLinkClick);
        quillRef.current = null;
      }

      editorElementRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.Container readOnly={readOnly} error={error}>
      <div id="quill-editor" ref={editorElementRef} data-text-editor="editor" />
    </Styled.Container>
  );
};

export default QuillEditor;
