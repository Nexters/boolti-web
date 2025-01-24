import { useDialog } from '@boolti/ui';

import Styled from './ShowInfoFormContent.styles';
import { PlusIcon } from '@boolti/icon';
import ShowCastInfoFormDialogContent, {
  TempShowCastInfoFormInput,
} from '../ShowCastInfoFormDialogContent';
import {
  DndContext,
  DragOverEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ShowCastInfo from '~/components/ShowCastInfo';
import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';

interface ShowCastInfoFormContentProps {
  initialCastTeamList?: TempShowCastInfoFormInput[];
  onChange: (value: TempShowCastInfoFormInput[]) => void;
}

const ShowCastInfoFormContent = ({
  initialCastTeamList,
  onChange,
}: ShowCastInfoFormContentProps) => {
  const dialog = useDialog();

  const [castTeamList, setCastTeamList] = useState<TempShowCastInfoFormInput[]>(
    initialCastTeamList ?? [],
  );
  const prevCastTeamList = useRef<string>(JSON.stringify(castTeamList));

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const castTeamDragEndHandler = useCallback((event: DragOverEvent) => {
    const { active, over } = event;

    if (active && over && over.id !== active.id) {
      setCastTeamList((prev) => {
        const oldIndex = prev.findIndex(({ id }) => id === active.id);
        const newIndex = prev.findIndex(({ id }) => id === over.id);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, []);

  const castAddButtonClickHandler = () => {
    dialog.open({
      isAuto: true,
      title: '출연진 정보 등록',
      content: (
        <ShowCastInfoFormDialogContent
          onSave={(castInfo) => {
            setCastTeamList((prev) => [...prev, castInfo]);
            dialog.close();
          }}
        />
      ),
    });
  };

  useEffect(() => {
    const stringifiedCastTeamList = JSON.stringify(castTeamList);

    if (prevCastTeamList.current !== stringifiedCastTeamList) {
      prevCastTeamList.current = stringifiedCastTeamList;
      onChange?.(castTeamList);
    }
  }, [castTeamList, onChange]);

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormGroupHeader>
        <Styled.ShowInfoFormGroupInfo style={{ marginBottom: 0 }}>
          <Styled.ShowInfoFormLabel style={{ justifyContent: 'space-between' }}>
            출연진 정보
            <Styled.MobileCastInfoRegisterButton type="button" onClick={castAddButtonClickHandler}>
              <PlusIcon />
              등록하기
            </Styled.MobileCastInfoRegisterButton>
          </Styled.ShowInfoFormLabel>
          <Styled.ShowInfoFormDescription>
            출연진 정보를 팀 단위로 등록해 주세요.
          </Styled.ShowInfoFormDescription>
        </Styled.ShowInfoFormGroupInfo>
        <Styled.DesktopCastInfoRegisterButton
          type="button"
          colorTheme="netural"
          size="small"
          icon={<PlusIcon />}
          onClick={castAddButtonClickHandler}
        >
          등록하기
        </Styled.DesktopCastInfoRegisterButton>
      </Styled.ShowInfoFormGroupHeader>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
        onDragEnd={castTeamDragEndHandler}
      >
        <SortableContext
          items={castTeamList.map((info) => info.id)}
          strategy={verticalListSortingStrategy}
        >
          {castTeamList.map((info) => (
            <ShowCastInfo
              key={info.id}
              showCastInfo={info}
              onSave={(showCastInfoFormInput: TempShowCastInfoFormInput) => {
                setCastTeamList((prev) =>
                  prev.map((item) => (item.id === info.id ? showCastInfoFormInput : item)),
                );
                return new Promise((resolve) => resolve());
              }}
              onDelete={() => {
                setCastTeamList((prev) => prev.filter((item) => item.id !== info.id));
                return new Promise((resolve) => resolve());
              }}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowCastInfoFormContent;
