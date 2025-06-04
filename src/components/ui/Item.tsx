import type { FC } from "react";
import type { Item as ItemType } from "../../types/list";
import { Draggable } from "../Draggable";

export const Item: FC<ItemType> = ({ id, data }) => {
  return (
    <Draggable id={id}>
      <div
        data-id={id}
        style={{
          border: "1px solid red",
          background: "yellow",
          padding: "4px",
        }}
      >
        {data}
      </div>
    </Draggable>
  );
};
