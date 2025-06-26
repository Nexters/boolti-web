import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
import { useUploadShowContentImage } from '@boolti/api';
import Styled from './QuillEditor.styles';
import './blot';

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

  const uploadShowContentImageMutation = useUploadShowContentImage();

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

  const videoUploadHandler = useCallback(async () => {
    if (!quillRef.current) return;

    const url = prompt('YouTube 영상 URL을 입력하세요:');

    if (url) {
      const embedUrl = url.replace('watch?v=', 'embed/');
      const range = quillRef.current.getSelection();

      if (range?.index === undefined) return;
      quillRef.current.insertEmbed(range.index, 'video', embedUrl);
    }
  }, [quillRef]);

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

    const quill = new Quill(editorElement, {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, false] }, 'bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }, 'blockquote'],
            ['image', 'link', 'video'],
          ],
          handlers: {
            image: imageUploadHandler,
            video: videoUploadHandler,
          },
        },
      },
      placeholder,
      readOnly,
      theme: 'snow',
    });

    quillRef.current = quill;

    if (defaultValueRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(defaultValueRef.current);
    }

    quillRef.current.on(Quill.events.TEXT_CHANGE, () => {
      if (!quillRef.current) return;
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
        quill.root.classList.remove('ql-blank');
      }, 0);
    });


    // IME 조합 완료 감지
    quillRef.current.root.addEventListener('compositionend', () => {
      if (!quillRef.current) return;

      const selection = quillRef.current.getSelection();
      if (selection) {
        quill.setSelection(selection.index);
      }
    });

    quillRef.current.root.addEventListener('input', () => {
      setTimeout(() => {
        if (quillRef.current?.root.innerText.trim() === '') {
          quill.root.classList.add('ql-blank');
        } else {
          quill.root.classList.remove('ql-blank');
        }
      }, 0);
    });

    return () => {
      if (quillRef.current) {
        quillRef.current.off(Quill.events.TEXT_CHANGE);
        quillRef.current.root.removeEventListener('blur', () => {
          if (!quillRef.current) return;
          const text = quillRef.current.getText().trim();
          onBlurRef.current?.(!text);
        });
        quillRef.current = null;
      }

      editorElementRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 링크 폼이 좌측으로 벗어나는 문제를 해결하기 위한 툴팁 위치 조정
  useEffect(() => {
    const adjustTooltipPosition = () => {
      const tooltip = document.querySelector('.ql-tooltip') as HTMLDivElement | null;
      if (tooltip) {
        const left = parseFloat(tooltip.style.left) || 0;
        if (left < 0) {
          tooltip.style.left = '10px';
        }
      }
    };

    const observer = new MutationObserver(adjustTooltipPosition);
    const editorContainer = document.querySelector('.ql-container');

    if (editorContainer) {
      observer.observe(editorContainer, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Styled.Container readOnly={readOnly} error={error}>
      <div id="quill-editor" ref={editorElementRef} data-text-editor="editor" />
    </Styled.Container>
  );
};

export default QuillEditor;
