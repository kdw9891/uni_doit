import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


interface BackgroundProps {
  children: React.ReactNode;
}


const ScrollArea : React.FC<BackgroundProps> = ({children }) => {
  return (
    <ScrollView>
      <TouchableOpacity  activeOpacity={1}>
        {children}
      </TouchableOpacity>
    </ScrollView>
  );
}
export default ScrollArea;