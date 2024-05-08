import styled from '@emotion/styled';

interface FileInputLabelProps {
  selected?: boolean;
}

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

const FileInputLabel = styled.label<FileInputLabelProps>`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  visibility: ${({ selected }) => (selected ? 'hidden' : 'visible')};
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputDescription = styled.div`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

const FileInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FileDownloadLink = styled.a``;

const FileName = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  font-weight: 600;
  text-decoration: underline;
`;

const FileCancelButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default {
  FileInputContainer,
  FileInputLabel,
  FileInput,
  FileInputDescription,
  FileInfo,
  FileDownloadLink,
  FileName,
  FileCancelButton,
};
