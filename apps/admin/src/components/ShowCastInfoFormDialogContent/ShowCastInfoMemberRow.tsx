import { ClearIcon, MenuIcon, TrashIcon, UserIcon } from '@boolti/icon';
import { Member } from '@boolti/api';
import { replaceUserCode } from '~/utils/replace';
import Styled from './ShowCastInfoFormDialogContent.styles';
import { TempShowCastInfoFormInput } from ".";
import { Control, Controller } from "react-hook-form";
import { forwardRef } from 'react';

export interface ShowCastInfoMemberRowProps {
  control: Control<TempShowCastInfoFormInput>;
  field: Partial<Member> & { id: number, _id: string };
  index: number;
  isFieldBlurred: { userCode: boolean; roleName: boolean };
  draggingStyle?: React.CSSProperties;
  onSetUser?: (userCode: string) => void;
  onResetUser?: () => void;
  onBlurRoleName?: () => void;
  onDelete?: () => void
}

const ShowCastInfoMemberRow = forwardRef<HTMLDivElement, ShowCastInfoMemberRowProps>(({ control, field, index, isFieldBlurred, draggingStyle, onSetUser, onResetUser, onBlurRoleName, onDelete, ...props }, ref) => {
  return (
    <Styled.Row ref={ref} style={draggingStyle}>
      <Styled.Handle type="button" {...props}>
        <MenuIcon />
      </Styled.Handle>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur } }) => {
          const value = field.userCode;
          const isError = Boolean(
            isFieldBlurred.userCode ? !value || !field.userNickname : false,
          );
          return (
            <Styled.FieldWrap>
              <Styled.InputWrapper isError={isError}>
                {field.userNickname ? (
                  <>
                    {field.userImgPath ? (
                      <Styled.UserImage
                        style={
                          {
                            '--imgPath': `url(${field.userImgPath})`,
                          } as React.CSSProperties
                        }
                      />
                    ) : (
                      <UserIcon size={32} />
                    )}
                    <Styled.Username>{field.userNickname}</Styled.Username>
                    <Styled.RemoveButton
                      onClick={() => {
                        onChange(undefined);
                        onResetUser?.();
                      }}
                    >
                      <ClearIcon />
                    </Styled.RemoveButton>
                  </>
                ) : (
                  <>
                    <Styled.HashTag>#</Styled.HashTag>
                    <Styled.Input
                      placeholder="식별 코드"
                      required
                      onChange={(e) => {
                        const nextValue = replaceUserCode(e.target.value);
                        onChange(nextValue);
                      }}
                      onBlur={async (event) => {
                        onBlur();
                        onSetUser?.(event.target.value);
                      }}
                      value={value ?? ''}
                    />
                  </>
                )}
              </Styled.InputWrapper>
              {isError && <Styled.ErrorMessage>필수 입력사항입니다.</Styled.ErrorMessage>}
            </Styled.FieldWrap>
          );
        }}
        name={`members.${index}.userCode`}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur } }) => {
          const value = field.roleName;
          const isError = isFieldBlurred.roleName && !value;
          return (
            <Styled.FieldWrap>
              <Styled.InputWrapper isError={isFieldBlurred.roleName && !value}>
                <Styled.Input
                  placeholder="역할"
                  required
                  onChange={onChange}
                  onBlur={() => {
                    onBlur();
                    onBlurRoleName?.();
                  }}
                  value={value ?? ''}
                />
              </Styled.InputWrapper>
              {isError && <Styled.ErrorMessage>필수 입력사항입니다.</Styled.ErrorMessage>}
            </Styled.FieldWrap>
          );
        }}
        name={`members.${index}.roleName`}
      />
      <Styled.TrashCanButton
        onClick={onDelete}
      >
        <TrashIcon />
      </Styled.TrashCanButton>
    </Styled.Row>
  );
});

export default ShowCastInfoMemberRow
