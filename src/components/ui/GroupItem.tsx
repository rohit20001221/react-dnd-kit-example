import { useDroppable } from "@dnd-kit/core";
import { type FC } from "react";
import type { GroupItem as GroupItemType } from "../../types/list";
import { Item } from "./Item";

export const GroupItem: FC<GroupItemType> = ({ id, groupName, items }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      style={
        isOver
          ? {
              border: "2px solid blue",
              padding: "4px",
              background: "lightblue",
              fontWeight: "bold",
              color: "blue",
            }
          : {}
      }
      ref={setNodeRef}
    >
      {items.length > 1 && <span>{groupName}</span>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "4px",
        }}
      >
        {items.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
