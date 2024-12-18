// import React, {useState, useEffect} from 'react';
// import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {ScreenProps} from '../../../App';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Splash : React.FC<ScreenProps> = ({navigation}) => {
//   //State for ActivityIndicator animation
//   const [animating, setAnimating] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setAnimating(false);
//       //Check if user_id is set or not
//       //If not then send for Authentication
//       //else send to Home Screen
//       AsyncStorage.getItem('user_id').then((value) =>
//         navigation.replace(value === null ? 'Login' : 'Login'),
//       );
//     }, 3000);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../../assets/newimages/doit_logo.png')}
//         style={{width: wp(55), resizeMode: 'contain', margin: 30}}
//       />
//       <ActivityIndicator
//         animating={animating}
//         color="#6990F7"
//         size="large"
//         style={styles.activityIndicator}
//       />
//     </View>
//   );
// };

// export default Splash;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   activityIndicator: {
//     alignItems: 'center',
//     height: 80,
//   },
// });