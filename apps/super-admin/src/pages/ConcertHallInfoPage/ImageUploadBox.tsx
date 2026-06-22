import { FileImageOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import { useRef } from 'react';

interface ImageUploadBoxProps {
  width: number;
  height: number;
  multiple?: boolean;
  onSelect: (files: File[]) => void;
}

// 점선 보더의 이미지 업로드 박스 (대표 이미지/사진 공용)
const ImageUploadBox = ({ width, height, multiple = false, onSelect }: ImageUploadBoxProps) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          width,
          height,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          borderRadius: 8,
          border: `1px dashed ${theme.palette.grey.g30}`,
          color: theme.palette.grey.g40,
          cursor: 'pointer',
        }}
      >
        <FileImageOutlined style={{ fontSize: 28 }} />
        <span style={{ fontSize: 14 }}>이미지 업로드</span>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          if (files.length > 0) {
            onSelect(files);
          }
          event.target.value = '';
        }}
      />
    </>
  );
};

export default ImageUploadBox;
