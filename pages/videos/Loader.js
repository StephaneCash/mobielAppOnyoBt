import { ActivityIndicator, View,Text } from "react-native";

const Loader = () => {
   return (
       <View className="bg-white h-screen flex justify-center">

           <ActivityIndicator size="large" color="red" />
       </View>
   )
}
export default Loader