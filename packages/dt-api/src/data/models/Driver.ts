export type DriverSource = {
  id: string;
  code: string;
  firstname: string;
  lastname: string;
  country: string;
  team: string;
};

export type Driver = DriverSource & {
  place: number;
  imgUrl: string;
};
