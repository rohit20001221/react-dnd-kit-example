import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { type FC } from "react";
import {
  SortableGroupProvider,
  useSortableGroup,
} from "./components/SortableGroupListContext";
import { GroupItem } from "./components/ui/GroupItem";
import { listItems } from "./data/items";

export default function App() {
  return (
    <SortableGroupProvider value={listItems}>
      <Container />
    </SortableGroupProvider>
  );
}

const Container: FC = () => {
  const { items, moveItemToGroup } = useSortableGroup();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={(e) => {
        console.log(e);

        if (e.active && e.over)
          moveItemToGroup(e.active?.id as string, e.over?.id as string);
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item) => (
            <GroupItem key={item.id} {...item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
