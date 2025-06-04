import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import type { Item, SortableGroupList } from "../types/list";

const SortableGroupContext = createContext<SortableGroupContextInterface>(
  {} as never
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSortableGroup = () => useContext(SortableGroupContext);

export const SortableGroupProvider: FC<
  PropsWithChildren<SortableGroupProviderProps>
> = ({ children, value }) => {
  const [items, setItems] = useState(value);

  const moveItemToGroup = (itemId: string, groupId: string) => {
    let selectedItem: Item | undefined = undefined;
    let sourceGroupId: string | undefined = undefined;

    for (const group of items) {
      for (const item of group.items) {
        if (item.id === itemId) {
          selectedItem = item;
          sourceGroupId = group.id;
        }
      }
    }

    if (selectedItem === undefined && sourceGroupId === undefined) return;

    setItems((groups) => {
      const results: SortableGroupList = [];
      groups.forEach((group) => {
        if (group.id !== sourceGroupId) {
          if (group.id === groupId) {
            results.push({
              ...group,
              items: [...group.items, selectedItem!],
            });
          } else {
            results.push(group);
          }
        } else {
          if (group.id === groupId) {
            results.push(group);
          } else {
            results.push({
              ...group,
              items: group.items.filter((item) => item.id !== selectedItem!.id),
            });
          }
        }
      });

      return results.filter((group) => group.items.length !== 0);
    });
  };

  return (
    <SortableGroupContext.Provider value={{ items, setItems, moveItemToGroup }}>
      {children}
    </SortableGroupContext.Provider>
  );
};

type SortableGroupProviderProps = {
  value: SortableGroupList;
};

type SortableGroupContextInterface = {
  items: SortableGroupList;
  setItems: Dispatch<SetStateAction<SortableGroupList>>;
  moveItemToGroup: (itemId: string, groupId: string) => void;
};
