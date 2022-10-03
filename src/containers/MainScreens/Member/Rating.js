import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import Stars from "react-native-stars"
import Textarea from "react-native-textarea"
import { Actions } from 'react-native-router-flux';


import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader"
import Footer from "../Footer/MemberFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator";
import { setRateForProvider } from "../../../redux/actions/memberActions"
import Emoji0 from "../../../assets/0.png"
import Emoji5 from "../../../assets/1.png"
import Emoji4 from "../../../assets/2.png"
import Emoji3 from "../../../assets/3.png"
import Emoji2 from "../../../assets/4.png"
import Emoji1 from "../../../assets/5.png"

var emojiArray = [
    Emoji0, Emoji1, Emoji2, Emoji3, Emoji4, Emoji5
]

export class RatingScreen extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        starVal: 0,
        rateDescription: ""
    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setNavigator(this.props.navigation, 'thirdPage')
    }


    nextPage = () => {
        if(this.props.starVal != 0) {
            this.props.setRateForProvider({mark: this.state.starVal, review: this.state.rateDescription, provider_id: this.props.roomInfo.created_room_info.provider_id, patient_id: this.props.roomInfo.created_room_info.patient_id })
        }

        // Actions.replace('providerDashboardScreen')
    }

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header
                    headerText = {"Share Your Feedback"}
                    backURL = {"MemberFirstPageScreen"}
                    backType = {"reset"}
                />
                <View style={MainStyles.HeaderStyle}></View>
                <ScrollView>
                    <View style={MainStyles.main}>
                        <View style = {MainStyles.userInfoText}>
                            <View style = {{justifyContent: "center", alignItems: "center"}}>
                                <View>
                                    <Image source = {emojiArray[this.state.starVal]} style = {{width: LAYOUT.window.width * 0.3, height: LAYOUT.window.width * 0.3, justifyContent: "center", alignItems: "center"}}></Image>
                                </View>
                                <Stars
                                    default={this.state.starVal}
                                    count={5}
                                    half={false}
                                    update={(val)=>{this.setState({starVal: val})}}
                                    fullStar={<FontAwesome name={'star'} size = {LAYOUT.window.width * 0.1} style={[MainStyles.myStarStyle, {margin: 5}]}/>}
                                    emptyStar={<FontAwesome name={'star-o'} size = {LAYOUT.window.width * 0.1} style={[MainStyles.myStarStyle, MainStyles.myEmptyStarStyle, {margin: 5}]}/>}
                                />
                            </View>
                        </View>
                        <Textarea 
                             containerStyle={MainStyles.textareaContainer}
                             style={MainStyles.textareaStyle}
                             onChangeText={(text) => this.setState({rateDescription: text})}
                             maxLength={120}
                             value = {this.state.rateDescription}
                             placeholder={'Enter Description'}
                             placeholderTextColor={'#c7c7c7'}
                             underlineColorAndroid={'transparent'}
                        />
                        <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.nextPage()}>
                            <Text style={MainStyles.Button}>Send FeedBack</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        roomInfo: state.chatroom
    }
}

const mapDispatchToProps = {
    setRateForProvider
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingScreen)    