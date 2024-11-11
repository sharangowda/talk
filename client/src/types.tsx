export type Column = {
  id: string | number;
  title: string | number;
};

export type Tasks = {
  id: string | number;
  columnID: string | number;
  content: string;
  status: string;
};

export type User = {
  username: string;
  roomId: string;
};
