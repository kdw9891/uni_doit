import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface BackgroundProps {
  children: React.ReactNode;
  viewStyle?: any;
}

const ScrollArea: React.FC<BackgroundProps> = ({children, viewStyle}) => {
  return (
    <ScrollView style={{width:"100%"}}>
      <TouchableOpacity activeOpacity={1}>{children}</TouchableOpacity>
    </ScrollView>
  );
};
export default ScrollArea;
