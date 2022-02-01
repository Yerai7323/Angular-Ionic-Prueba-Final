/* eslint-disable @typescript-eslint/naming-convention */
export interface Actor {
  id: number;
  first_name: string;
  last_name: string;
  gender: 'Female' | 'Male';
  bornCity: string;
  birthdate: string;
  img: null | string;
  rating: number;
  movies: number[];
}
