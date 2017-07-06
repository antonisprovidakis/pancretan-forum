import {Comment} from './comment.interface';

export interface Product {
  title: string;
  descr: string;
  popularity: number;
  comments: Comment[];
  image: string;
}
