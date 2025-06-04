import { useDroppable } from "@dnd-kit/core";
import type { FC, PropsWithChildren } from "react";

export const Droppable: FC<PropsWithChildren<DroppableProps>> = ({
  id,
  children,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return <div ref={setNodeRef}>{children}</div>;
};

type DroppableProps = {
  id: string;
};
