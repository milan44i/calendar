export type Meeting = {
  id: number;
  date: string;
  time: string;
  datetime: string | Date; // will be Date only
  name: string;
  imageUrl: string;
  location: string;
};
