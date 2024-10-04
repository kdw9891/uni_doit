import {palette} from '../../common/palette';

type IconType =
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
  | 'undefinded';

interface DataItem {
  id: string;
  text?: string;
  iconType: IconType;
  iconName: string;
  path?: string;
  iconColor?: string;
}

const createDataSet = (items: Omit<DataItem, 'id'>[]): DataItem[] =>
  items.map((item, index) => ({
    ...item,
    id: (index + 1).toString(),
  }));

// HomeMenuData
const HOME_MENU_DATA = createDataSet([
  {
    text: '',
    iconType: 'FontAwesome5',
    iconName: 'crown',
    path: '',
    iconColor: palette.amber[900],
  },
  {
    text: '',
    iconType: 'FontAwesome6',
    iconName: 'box-open',
    path: '',
    iconColor: palette.brown[600],
  },
  {
    text: '',
    iconType: 'FontAwesome5',
    iconName: 'store',
    path: '',
    iconColor: palette.green[800],
  },
]);

export default {
  HOME_MENU_DATA,
};
