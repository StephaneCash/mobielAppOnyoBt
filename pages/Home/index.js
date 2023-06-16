import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import dashboardStyles from './style.js';
import { ContextApp } from '../../context/AuthContext.js';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/EvilIcons.js';
import { useSelector } from 'react-redux';
import { baseUrlFile } from '../../bases/basesUrl.js';
import { Avatar } from "@react-native-material/core";

const Home = () => {

  const { fullDataUserConnected } = useContext(ContextApp);
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('settings/profil')
  }
  const user = useSelector(state => state.users.value)
  const compte = useSelector(state => state.comptes.value);

  console.log(compte, " USER COMPTE")

  return (
    <ScrollView>
      <View style={dashboardStyles.header}>
        <View style={{
          display: "flex",
          flexDirection: "column"
        }}>
          <Text style={dashboardStyles.userName}>
            {user && user.map(val => {
              if (fullDataUserConnected && fullDataUserConnected._id === val._id) {
                return val.pseudo
              }
            })}
          </Text>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>{compte && compte.numero && "Votre numéro : " + compte.numero}</Text>
        </View>
        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20
        }}>
          <Icon name='search' style={{ fontSize: 30, color: "#fff", fontWeight: 100 }} />
          <TouchableOpacity onPress={() => handleNavigate()}>
            {user && user.map(val => {
              if (fullDataUserConnected && fullDataUserConnected._id === val._id) {
                return <Avatar key={val._id} label={val && val.pseudo && val.pseudo} size={30} color='#fff'
                  image={{ uri: val && baseUrlFile + "/" + val.url }} style={dashboardStyles.userImg} />
              }
            })}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
      }}>
        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: "48%",
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6,
              color: '#000'
            }}
          >Transactions/jour</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <ScrollView
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#333"
                }}
              ></Text>
              <Text style={{ color: "red", fontWeight: "bold", }}>OBT</Text>
            </ScrollView>
          </View>
        </View>

        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: "48%",
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6,
              color: '#000'
            }}
          >Argent gagné</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,

            }}
          >
            <ScrollView
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#333"
                }}
              >
                {
                  compte && compte.pourcentage && compte.pourcentage
                }</Text>

              <Text style={{ color: "red", fontWeight: "bold", }}>OBT</Text>
            </ScrollView>
          </View>
        </View>
      </View>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 5,
          width: "100%",
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 6,
              color: '#000'
            }}
          >Solde</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10
            }}
          >
            <ScrollView
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#333"
                }}
              >
                {compte && compte.solde && compte.solde}
              </Text>
              <Text style={{ color: "red", fontWeight: "bold", }}>OBT</Text>
            </ScrollView>
          </View>
        </View>
      </View>

      <Text style={{
        padding: 15,
        fontSize: 20,
        fontWeight: "bold",
        color: "#000"
      }}>Opérations</Text>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
      }}>

        <TouchableOpacity style={{
          flexDirection: 'column',
          backgroundColor: "#fff",
          elevation: 2,
          borderRadius: 10,
          width: "48%",
          padding: 15
        }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "600",
              color: '#000'
            }}
          >RETIRER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('rechargeCompte')}
          style={{
            flexDirection: 'column',
            backgroundColor: "#fff",
            elevation: 2,
            borderRadius: 10,
            width: '48%',
            padding: 15
          }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontWeight: "600",
              color: '#000'
            }}
          >RECHARGER</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'column',
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "100%",
        padding: 15
      }}>
        <Text style={dashboardStyles.videoTitle}>
          Vos forfaits
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