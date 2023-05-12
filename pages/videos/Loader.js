import { ActivityIndicator, View,Text } from "react-native";

const Loader = () => {
   return (
       <View className="bg-white h-screen flex justify-center">

           <ActivityIndicator size="large" color="red" />
           <Text className="text-pink-900 font-bold text-center" >Publication...</Text>
       </View>
   )
}
export default Loader