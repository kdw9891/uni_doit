// import {palette} from '../../common/palette';
// import {IconType, DataItem} from '../../common/types';

// const createDataSet = (items: Omit<DataItem, 'id'>[]): DataItem[] =>
//   items.map((item, index) => ({
//     ...item,
//     id: (index + 1).toString(),
//   }));

// // HomeMenuData
// const UNCOMMON_DATA = createDataSet([
//   {
//     text: '기본 고양이 모자',
//     iconType: 'FontAwesome5',
//     iconName: 'hat-wizard',
//     path: '',
//     iconColor: palette.amber[400],
//   },
//   {
//     text: '고급 고양이 모자',
//     iconType: 'FontAwesome6',
//     iconName: 'ear-listen',
//     path: '',
//     iconColor: palette.brown[400],
//   },
//   {
//     text: '학습 부스터',
//     iconType: 'AntDesign',
//     iconName: 'star',
//     path: '',
//     iconColor: palette.amber[400],
//   },
//   {
//     text: '레인보우 고양이 배경',
//     iconType: 'Entypo',
//     iconName: 'rainbow',
//     path: '',
//     iconColor: palette.purple[200],
//   },
//   {
//     text: '고양이 도우미',
//     iconType: 'Ionicons',
//     iconName: 'logo-octocat',
//     path: '',
//     iconColor: palette.green[400],
//   },
//   {
//     text: '포인트 부스터',
//     iconType: 'Entypo',
//     iconName: 'rocket',
//     path: '',
//     iconColor: palette.blueGray[400],
//   },
//   {
//     text: '집중력 향상 물약',
//     iconType: 'MaterialCommunityIcons',
//     iconName: 'flask-round-bottom',
//     path: '',
//     iconColor: palette.purple[900],
//   },
//   {
//     text: '전설의 고양이 왕관',
//     iconType: 'Foundation',
//     iconName: 'crown',
//     path: '',
//     iconColor: palette.yellow[600],
//   },
//   {
//     text: '레인보우 고양이 배경',
//     iconType: 'FontAwesome',
//     iconName: 'paint-brush',
//     path: '',
//     iconColor: palette.red[300],
//   },
//   {
//     text: '학습 시간 되돌리기',
//     iconType: 'Entypo',
//     iconName: 'back-in-time',
//     path: '',
//     iconColor: palette.deepOrange[600],
//   },
// ]);

// const CONSUMABLE_DATA = createDataSet([
//   {
//     text: '에너지 드링크',
//     iconType: 'MaterialIcons',
//     iconName: 'local-drink',
//     path: '',
//     iconColor: palette.red[500],
//   },
//   {
//     text: '집중력 향상 물약',
//     iconType: 'MaterialCommunityIcons',
//     iconName: 'flask-outline',
//     path: '',
//     iconColor: palette.blue[500],
//   },
//   {
//     text: '시간 확장기',
//     iconType: 'FontAwesome',
//     iconName: 'hourglass-half',
//     path: '',
//     iconColor: palette.green[500],
//   },
//   {
//     text: '포인트 부스터',
//     iconType: 'Entypo',
//     iconName: 'rocket',
//     path: '',
//     iconColor: palette.orange[500],
//   },
// ]);

// const SPECIAL_ITEMS_DATA = createDataSet([
//   {
//     text: '투명 방패',
//     iconType: 'MaterialCommunityIcons',
//     iconName: 'shield',
//     path: '',
//     iconColor: palette.gray[500],
//   },
//   {
//     text: '마법의 지팡이',
//     iconType: 'FontAwesome5',
//     iconName: 'magic',
//     path: '',
//     iconColor: palette.purple[500],
//   },
//   {
//     text: '시간 여행기',
//     iconType: 'FontAwesome5',
//     iconName: 'clock',
//     path: '',
//     iconColor: palette.blue[700],
//   },
//   {
//     text: '불사조의 깃털',
//     iconType: 'MaterialIcons',
//     iconName: 'whatshot',
//     path: '',
//     iconColor: palette.red[700],
//   },
//   {
//     text: '속도 부스터',
//     iconType: 'MaterialCommunityIcons',
//     iconName: 'speedometer',
//     path: '',
//     iconColor: palette.red[400],
//   },
//   {
//     text: '경험치 부스터',
//     iconType: 'FontAwesome5',
//     iconName: 'book-reader',
//     path: '',
//     iconColor: palette.blue[400],
//   },
//   {
//     text: '에너지 부스터',
//     iconType: 'MaterialIcons',
//     iconName: 'battery-charging-full',
//     path: '',
//     iconColor: palette.yellow[400],
//   },
// ]);

// const CUSTOMIZING_DATA = createDataSet([
//   {
//     text: '고양이 모자',
//     iconType: 'FontAwesome5',
//     iconName: 'hat-wizard',
//     path: '',
//     iconColor: palette.amber[300],
//   },
//   {
//     text: '고양이 안경',
//     iconType: 'FontAwesome5',
//     iconName: 'glasses',
//     path: '',
//     iconColor: palette.blue[300],
//   },
//   {
//     text: '고양이 목걸이',
//     iconType: 'FontAwesome5',
//     iconName: 'gem',
//     path: '',
//     iconColor: palette.purple[300],
//   },
//   {
//     text: '고양이 신발',
//     iconType: 'FontAwesome5',
//     iconName: 'shoe-prints',
//     path: '',
//     iconColor: palette.green[300],
//   },
// ]);

// const ACCESSORY_DATA = createDataSet([
//   {
//     text: '고양이 귀걸이',
//     iconType: 'FontAwesome5',
//     iconName: 'headphones',
//     path: '',
//     iconColor: palette.pink[300],
//   },
//   {
//     text: '고양이 팔찌',
//     iconType: 'FontAwesome5',
//     iconName: 'hand-sparkles',
//     path: '',
//     iconColor: palette.yellow[300],
//   },
//   {
//     text: '고양이 반지',
//     iconType: 'FontAwesome5',
//     iconName: 'ring',
//     path: '',
//     iconColor: palette.green[300],
//   },
//   {
//     text: '고양이 장갑',
//     iconType: 'FontAwesome5',
//     iconName: 'mitten',
//     path: '',
//     iconColor: palette.blue[300],
//   },
// ]);

// const COMPANION_ITEMS_DATA = createDataSet([
//   {
//     text: '고양이 친구',
//     iconType: 'FontAwesome5',
//     iconName: 'cat',
//     path: '',
//     iconColor: palette.orange[300],
//   },
//   {
//     text: '강아지 친구',
//     iconType: 'FontAwesome5',
//     iconName: 'dog',
//     path: '',
//     iconColor: palette.brown[300],
//   },
//   {
//     text: '새 친구',
//     iconType: 'FontAwesome5',
//     iconName: 'dove',
//     path: '',
//     iconColor: palette.blue[300],
//   },
//   {
//     text: '물고기 친구',
//     iconType: 'FontAwesome5',
//     iconName: 'fish',
//     path: '',
//     iconColor: palette.teal[300],
//   },
// ]);

// export default{
//   UNCOMMON_DATA,
//   CONSUMABLE_DATA,
//   SPECIAL_ITEMS_DATA,
//   CUSTOMIZING_DATA,
//   ACCESSORY_DATA,
//   COMPANION_ITEMS_DATA,
// };