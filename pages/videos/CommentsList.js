import React from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Avatar } from "@react-native-material/core";
import { useSelector } from 'react-redux';
import { baseUrlFile } from '../../bases/basesUrl';
import moment from 'moment';

const CommentsList = ({ post }) => {

  const users = useSelector(state => state.users.value);

  let arrIndex = [];

  return (
    <FlatList
      data={post && post.comments && post.comments}
      style={{ marginBottom: 10, }}
      renderItem={({ item, index }) => {
        return users.map(user => {
          arrIndex.push(index)
          if (user._id === item.commenterId) {
            return <View key={item && item._id} style={{
              flexDirection: "column",
              flex: 1
            }}>
              <View style={styles.viewComment}>
                <Avatar label={item.commenterPseudo} size={30} color='#fff'
                  image={{ uri: user && baseUrlFile + "/" + user.url }} />
                <Text  style={{ color: "#fff" }}>{item.commenterPseudo}</Text>

                <Text style={{ color: "#fff" }}>{item.text}</Text>
                <Text  style={{ color: "#fff" }}>, {moment(item.timestamp).fromNow()}</Text>
              </View>
            </View>
          }
        })
      }}
      keyExtractor={item => item && item._id}

    />
  )
}

export default CommentsList


const styles = StyleSheet.create({
  viewComment: {
    paddingRight: 13,
    flexDirection: 'row',
    alignItems: "center",
    gap: 10,
    marginBottom: 10
  },

})