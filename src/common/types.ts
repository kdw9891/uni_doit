export type Dictionary = {
  [key: string]: any;
};

export type FormData = {
  [key: string]: string | number | boolean;
};

export type FormDictionary = {
  [key: string]: string | string[];
};

export type MenuAuth = {
  [key: string]: number;
};

export type UploadFile = {
  id: string;
  folder: string;
  ymd: string;
  name: string;
  size: number;
  type: string;  
}

export enum PermMethod {
  read = 0,
  create,
  update,
  delete,
  admin,
  etc1,
  etc2,
  etc3,
  etc4,
  etc5,
  void,
};