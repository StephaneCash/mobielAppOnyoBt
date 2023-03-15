import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SVG_TRANSACTION from "../../images/svg/undraw_credit_card_re_blml.svg";
import SVG_MONEY from "../../images/svg/undraw_transfer_money_re_6o1h.svg";
import SVG_SAVE_MONEY from "../../images/svg/undraw_savings_re_eq4w.svg";
import Styles from './style';

const ActivityItem = ({ item }) => {
    return (
        <TouchableOpacity style={Styles.scrollabelItem}>
            {item.mainText === "Transactions" ?
                <SVG_TRANSACTION width={60} height={60} /> :
                item.mainText === "Solde gagné" ?
                    <SVG_MONEY width={60} height={60} /> :
                    item.mainText === "Solde total" ? <SVG_SAVE_MONEY width={60} height={60} />
                        : ""
            }
            <Text style={Styles.mainText}>{item.mainText}</Text>
            <Text style={Styles.numText}>{item.devise ? item.num + " " + item.devise : item.num} </Text>
        </TouchableOpacity>
    )
}

export default ActivityItem