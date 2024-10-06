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

export type IconType =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome5Brands'
  | 'FontAwesome6'
  | 'FontAwesome6Brands'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial'
  | undefined;

export interface DataItem {
  id: string;
  text: string;
  iconType: IconType;
  iconName: string;
  path?: string;
  iconColor?: string;
}
