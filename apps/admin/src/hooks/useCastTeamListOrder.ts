import { useChangeCastTeamOrder } from "@boolti/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { DragOverEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { TempShowCastInfoFormInput } from "~/components/ShowCastInfoFormDialogContent";

interface UseCastTeamListOrderParams {
  showId?: number;
  castTeamList?: TempShowCastInfoFormInput[];
  onChange?: () => void;
}

const useCastTeamListOrder = (params?: UseCastTeamListOrderParams) => {
  const showId = params?.showId;
  const castTeamList = params?.castTeamList;

  const [castTeamListDraft, setCastTeamListDraft] = useState<TempShowCastInfoFormInput[]>([]);
  const currentCastTeamIds = useRef<string | null>(null)

  const changeCastTeamOrder = useChangeCastTeamOrder();

  const castTeamDragEndHandler = useCallback((event: DragOverEvent) => {
    const { active, over } = event;

    if (active && over && over.id !== active.id) {
      setCastTeamListDraft((prev) => {
        const oldIndex = prev.findIndex(({ id }) => id === active.id);
        const newIndex = prev.findIndex(({ id }) => id === over.id);
        
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, []);

  const fetchCastTeamOrder = useCallback(async (castTeamIds: number[]) => {
    if (showId === undefined || castTeamIds.length === 0) return;

    await changeCastTeamOrder.mutateAsync({
      showId,
      body: {
        castTeamIds,
      },
    });
  }, [changeCastTeamOrder, showId]);

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
    })
  );

  useEffect(() => {
    if (!castTeamList) return;

    setCastTeamListDraft(castTeamList);
  }, [castTeamList]);

  useEffect(() => {
    const castTeamIds = castTeamListDraft.map(({ id }) => id)
    const stringifiedCastTeamIds = JSON.stringify(castTeamIds);

    if (stringifiedCastTeamIds === currentCastTeamIds.current) return;

    currentCastTeamIds.current = stringifiedCastTeamIds;
    fetchCastTeamOrder(castTeamIds);
  }, [castTeamListDraft, fetchCastTeamOrder]);

  return {
    castTeamListDraft,
    sensors,
    setCastTeamListDraft,
    castTeamDragEndHandler,
  }
}

export default useCastTeamListOrder
