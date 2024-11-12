import {palette} from '../../common/palette';
import {IconType, DataItem} from '../../common/types';

const createDataSet = (items: Omit<DataItem, 'id'>[]): DataItem[] =>
  items.map((item, index) => ({
    ...item,
    id: (index + 1).toString(),
  }));

// HomeMenuData
const INVENTORY_DATA = createDataSet([
  {
    text: '기본 고양이 모자',
    iconType: 'FontAwesome5',
    iconName: 'hat-wizard',
    path: '',
    iconColor: palette.amber[400],
  },
  {
    text: '고급 고양이 모자',
    iconType: 'FontAwesome6',
    iconName: 'ear-listen',
    path: '',
    iconColor: palette.brown[400],
  },
  {
    text: '에너지 드링크',
    iconType: 'MaterialIcons',
    iconName: 'local-drink',
    path: '',
    iconColor: palette.red[500],
  },
  {
    text: '집중력 향상 물약',
    iconType: 'MaterialCommunityIcons',
    iconName: 'flask-outline',
    path: '',
    iconColor: palette.blue[500],
  },
  {
    text: '투명 방패',
    iconType: 'MaterialCommunityIcons',
    iconName: 'shield',
    path: '',
    iconColor: palette.gray[500],
  },
  {
    text: '마법의 지팡이',
    iconType: 'FontAwesome5',
    iconName: 'magic',
    path: '',
    iconColor: palette.purple[500],
  },
  {
    text: '고양이 모자',
    iconType: 'FontAwesome5',
    iconName: 'hat-wizard',
    path: '',
    iconColor: palette.amber[300],
  },
  {
    text: '고양이 안경',
    iconType: 'FontAwesome5',
    iconName: 'glasses',
    path: '',
    iconColor: palette.blue[300],
  },
  {
    text: '고양이 귀걸이',
    iconType: 'FontAwesome5',
    iconName: 'headphones',
    path: '',
    iconColor: palette.pink[300],
  },
  {
    text: '고양이 팔찌',
    iconType: 'FontAwesome5',
    iconName: 'hand-sparkles',
    path: '',
    iconColor: palette.yellow[300],
  },
  {
    text: '고양이 반지',
    iconType: 'FontAwesome5',
    iconName: 'ring',
    path: '',
    iconColor: palette.green[300],
  },
  {
    text: '고양이 친구',
    iconType: 'FontAwesome5',
    iconName: 'cat',
    path: '',
    iconColor: palette.orange[300],
  },
  {
    text: '강아지 친구',
    iconType: 'FontAwesome5',
    iconName: 'dog',
    path: '',
    iconColor: palette.brown[300],
  },
]);

export default{
  INVENTORY_DATA,
};