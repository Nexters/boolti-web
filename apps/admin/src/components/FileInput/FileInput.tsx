import { ClearIcon } from '@boolti/icon';
import { useRef, useState } from 'react';

import Styled from './FileInput.styles';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  downloadUrl?: string;
  clearable?: boolean;
  initialFileName?: string;
  onClear?: () => void;
}

const FileInput = ({
  description,
  downloadUrl,
  clearable = true,
  initialFileName,
  onClear,
  ...props
}: FileInputProps) => {
  const [fileName, setFileName] = useState<string | null>(initialFileName ?? null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileSelected = fileName !== null;

  const fileInputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = (event.target as HTMLInputElement).value.split('\\').pop();

    if (value !== undefined) {
      setFileName(value);
    }

    props.onChange?.(event);
  };

  const clearClickHandler = () => {
    setFileName(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    onClear?.();
  };

  return (
    <Styled.FileInputContainer>
      <Styled.FileInputLabel selected={fileSelected}>
        <Styled.FileInput
          {...props}
          ref={fileInputRef}
          type="file"
          onChange={fileInputChangeHandler}
        />
        파일 선택
      </Styled.FileInputLabel>
      {description && !fileSelected && (
        <Styled.FileInputDescription>{description}</Styled.FileInputDescription>
      )}
      {fileName !== null && (
        <Styled.FileInfo>
          {downloadUrl ? (
            <Styled.FileDownloadLink href={downloadUrl} target="_blank" rel="noreferrer noopener">
              <Styled.FileName>{fileName}</Styled.FileName>
            </Styled.FileDownloadLink>
          ) : (
            <Styled.FileName>{fileName}</Styled.FileName>
          )}
          {clearable && (
            <Styled.FileCancelButton type="button" onClick={clearClickHandler}>
              <ClearIcon />
            </Styled.FileCancelButton>
          )}
        </Styled.FileInfo>
      )}
    </Styled.FileInputContainer>
  );
};

export default FileInput;
