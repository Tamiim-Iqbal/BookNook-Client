export interface Book {
  _id: string;
  category: string;
  name: string;
  author: string;
  img: string;
  description: string;
  rating: number;
  copy: number;
  addedBy: {
    name: string;
    email: string;
  };
}