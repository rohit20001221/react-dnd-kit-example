export type Item = {
  id: string;
  data: string;
};

export type GroupItem = {
  id: string;
  groupName: string;
  items: Item[];
};

export type SortableGroupList = GroupItem[];
