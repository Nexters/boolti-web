import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import ShowCastInfoMemberRow, { ShowCastInfoMemberRowProps } from "./ShowCastInfoMemberRow";

interface DraggableShowCastInfoMemberRowProps extends ShowCastInfoMemberRowProps {
  id: string
}

const DraggableShowCastInfoMemberRow = ({ id, ...props }: DraggableShowCastInfoMemberRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1
  };
  
  return (
    <ShowCastInfoMemberRow {...props} ref={setNodeRef} draggingStyle={style} {...attributes} {...listeners} />
  )
}

export default DraggableShowCastInfoMemberRow