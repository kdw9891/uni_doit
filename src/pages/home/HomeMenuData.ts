import {palette} from '../../common/palette';
import {IconType, DataItem} from '../../common/types';

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
    path: 'Rank',
    iconColor: palette.amber[900],
  },
  {
    text: '',
    iconType: 'FontAwesome6',
    iconName: 'box-archive',
    path: 'Inventory',
    iconColor: palette.brown[600],
  },
  {
    text: '',
    iconType: 'FontAwesome5',
    iconName: 'store',
    path: 'Store',
    iconColor: palette.green[800],
  },
]);

export default {
  HOME_MENU_DATA,
};
