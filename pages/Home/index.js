import { View, Text, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import dashboardStyles from './style.js';
import { FakaData } from '../../fakeData/fakeActivitty.js';
import ActivityItem from '../../components/activityItem/index.js';
import { FakeVideos } from '../../fakeData/fakeVideoComment.js';
import VideoPlus from '../../components/videosPlusComments/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SVG_TRANSACTION from "../../images/svg/undraw_credit_card_re_blml.svg";
import SVG_MONEY from "../../images/svg/undraw_wallet_re_cx9u.svg";
import SOLDE from "../../images/svg/solde.svg";
import RETRAIT from "../../images/svg/retrait.svg";
import POURCENTAGE from "../../images/svg/pourcentage.svg";
import RECHARGE from "../../images/svg/recharge.svg";

const Home = () => {

  const [nameUser, setNameUser] = useState("Stéphane");

  return (
    <ScrollView>
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.userName}>
          {nameUser && nameUser}
        </Text>
        <Image source={require("../../images/cash.jpeg")} style={dashboardStyles.userImg} />
      </View>

      <Text style={{
        padding: 15,
        fontSize: 20,
        color: "#0e6bf7",
        fontWeight: "bold",
      }}>Tableau de bord</Text>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15,
        gap: 20,
        marginBottom: 20
      }}>
        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: 170,
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6
            }}
          >Transactions/jour</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <SVG_TRANSACTION width={60} height={60} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333"
              }}
            >22</Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: 170,
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6
            }}
          >Argent gagné</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <SVG_MONEY width={60} height={60} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333"
              }}
            >14 OBT</Text>
          </View>
        </View>
      </View>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15,
        gap: 20
      }}>
        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: 170,
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6
            }}
          >Solde</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <SOLDE width={60} height={60} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333"
              }}
            >160</Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: 170,
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6
            }}
          >Pourcentage</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              overflow: "scroll"
            }}
          >
            <POURCENTAGE width={60} height={60} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
              }}
            >0.677167676ZZZZ7</Text>
          </View>
        </View>
      </View>

      <Text style={{
        padding: 15,
        fontSize: 20,
        fontWeight: "bold",
      }}>Opérations</Text>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 15,
        marginRight: 15,
        gap: 20,
        marginTop: 10
      }}>
        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: 170,
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6,
              textAlign: "center"
            }}
          >Retrait OBT</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <RETRAIT width={60} height={60} />
          </View>
        </View>

        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: 170,
          padding: 15,
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6,
              textAlign: "center"
            }}
          >Pourcentage</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <RECHARGE width={60} height={60} />
          </View>
        </View>
      </View>

      <View style={dashboardStyles.spaceBettwen}>
        <Text style={dashboardStyles.videoTitle}>
          Transactions
        </Text>

        <TouchableOpacity>
          <Text style={dashboardStyles.link}>
            Afficher tout
          </Text>
        </TouchableOpacity>
      </View>

      <View style={dashboardStyles.transactionContainer}></View>

    </ScrollView>
  )
}

export default Home