import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  StyleSheet, 
  Button, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Text, 
  Linking, 
  TextInput,
  SafeAreaView,
  FlatList 
} from "react-native";
import { OTSession, OTPublisher, OTSubscriber } from 'opentok-react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal"

import { LAYOUT } from '../../../constants';
import { navigate } from "../../../redux/actions/navigator"
import { closedProviderCall } from "../../../redux/actions/ChatRoomActions"
import MainStyles from "../Style/MainStyle"
import Collapse from "./patientInfoCollaps"
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state={
      apiData: props.navigation.state.params,
      publishAudio: true,
      publishVideo: true,
      isModalVisible: false,
      isTextChatVisible: false,
      signal: {
        data: '',
        type: '',
      },
      text: '',
      messages: [],
    }
    // this.otSession = React.createRef();
  }

  componentDidMount() {
  }

  cancelAndBack(sessionId){
    Alert.alert("", "Do you want to leave this room?", [
      {text: "Cancel", style: "cancel"},
      {text: "Confirm", onPress: () => {
        if(this.props.user.role == 'member') {
          Actions.reset('RatingScreen')
        } else {
          Actions.reset('ProviderDashboardScreen');
        }
      }}
    ], 
    {cancelable: false})
  }

  endCall = (e) => {
    console.log(e);
  }

  sessionEventHandlers = {
    signal: (event) => {
      if (event.data) {
        var data = JSON.parse(event.data);
        var msgData = JSON.parse(data.data);
        if(!msgData.sender)
        {
          return;
        }

        this.setState({isTextChatVisible: true});
        const myConnectionId = this.otSession.getSessionInfo().connection.connectionId;
        const oldMessages = this.state.messages;

        var sender = msgData.sender;
        var msgText = msgData.text;
        var sendTime = msgData.time;
        var id = (oldMessages.length + 1) + "";

        const messages = (event.connectionId === myConnectionId 
                                                  ? [...oldMessages, {id: id, msg: msgText, from: 'Me', last_msg_time: sendTime}] 
                                                  : [...oldMessages, {id: id, msg: msgText, from: sender, last_msg_time: sendTime}]);
        this.setState({
          messages,
        });
      } else {
        return true;
      }
    },
  }

  publisherEventHandlers = {
    streamCreated: event => {
      console.log('Publisher stream created!');
    },
    streamDestroyed: event => {
      if(this.props.user.role == "provider") {
        this.props.closedProviderCall({provider_id: this.props.room_info.created_room_info.provider_id, patient_id: this.props.room_info.created_room_info.patient_id, appt_id: this.props.room_info.created_room_info.id})
        // Actions.replace('ProviderDashboardScreen');
      }
      console.log('Publisher stream destroyed!');
    }
  };

  subscriberEventHandlers = {
    error: (error) => {
      console.log(`There was an error with the subscriber: ${error}`);
    },
    disconnected: event => {
      if(this.props.user.role == "member") {
        Actions.reset('RatingScreen');
      }
      console.log('subscriber has been disconnected!');
    },
    connected: event => {
      console.log('subscriber has been connected!');
    },
  };
  
  sendSignal() {
    if (this.state.text) {
      var dt = new Date();
      var h =  dt.getHours(), m = dt.getMinutes();
      var _time = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');

      this.setState({
        signal: {
          type: 'chat',
          data: JSON.stringify({
            _head: {
              id: this.state.messages.length,
              seq: 0,
              tot: 1
            },
            data: JSON.stringify({
              text: this.state.text,
              time: _time,
              sender: this.props.user.first_name + " " + this.props.user.last_name
            })
          }),
        },
        text: '',
      });
    }
  }

  setPublishVideo = () => {
    this.setState({publishVideo: !this.state.publishVideo})
  }

  setPublishAudio = () => {
    this.setState({publishAudio: !this.state.publishAudio})
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleTextChatModal = () => {
    this.setState({isTextChatVisible: !this.state.isTextChatVisible});
  };

  redirectFunc = () => {
    Linking.openURL("https://ayva.bravadohealth.com/#!/login").catch(err => console.error("Couldn't load page", err));
  }

  userSelections = (item) => {
     if (item.from == 'Me') {
      return(
        <View style={{marginTop: 30}}>
          <View style={styles.userBlock}>
            <View style={styles.userMsgBlock}>
              <Text style={styles.userMsgText}>{item.msg}</Text>
              <View style={styles.userTimeBlock}>
                <Text style={styles.timestampText}>{item.last_msg_time}</Text>
              </View>
            </View>
          </View>
        </View>
      );   
    } else {
      return(
        <View style={{marginTop: 30}}>
          <View style={styles.friendBlock}>
            <View style={styles.agentMsgBlock}>
              <Text style={styles.agentMsgText}>{item.msg}</Text>
              <View style={styles.friendTimeBlock}>
                <Text style={styles.timestampText}>{item.last_msg_time}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  // ref: Ref<typeof Publisher>;
  
  render() {
    const apiData = this.state.apiData;
    return (
       <View style={styles.container}>
          <OTSession 
                    ref={(instance) => {this.otSession = instance}} 
                    apiKey={apiData.apiKey.toString()} 
                    sessionId={apiData.sessionId} 
                    token={apiData.token} 
                    style={styles.TotalStyle}
                    eventHandlers={this.sessionEventHandlers}
                    signal={this.state.signal}
                  >
            <View  style={styles.myVideo}>
              <OTPublisher 
                style = {{width: '100%', height: "100%", borderWidth: 1, borderColor: "white", position: "absolute"}} 
                eventHandlers={this.publisherEventHandlers}
                properties = {{
                  publishAudio: this.state.publishAudio,
                  publishVideo: this.state.publishVideo
                }}
              >
              </OTPublisher>
            </View>
            <View style={styles.yourVideo}>
              <OTSubscriber 
                    style = {{width: '100%', height: "100%", borderRadius: 20}} 
                    disconnect eventHandlers = { this.subscriberEventHandlers} 
              />
            </View>
            <View style = {styles.toolButtonGroup}>
                <TouchableOpacity onPress={()=>this.cancelAndBack(apiData.sessionId)} style = {[styles.ButtonStyles, {backgroundColor: "red", borderWidth: 0}]} >
                  <FontAwesome5 name = "phone" size = {30} color = {'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setPublishVideo()} style = {styles.ButtonStyles} >
                  {this.state.publishVideo ? (
                    <FontAwesome5 name = "video" size = {30} color = {'white'} />
                    ) : (
                      <FontAwesome5 name = "video-slash" size = {30} color = {'white'} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setPublishAudio()} style = {styles.ButtonStyles} >
                  {this.state.publishAudio ? (
                    <FontAwesome5 name = "microphone" size = {30} color = {'white'} />
                    ) : (
                      <FontAwesome5 name = "microphone-slash" size = {30} color = {'white'} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.toggleModal()} style = {styles.ButtonStyles} >
                  <FontAwesome5 name = "book" size = {30} color = {'white'} />
                </TouchableOpacity>
                {this.props.user.role == "member" ? (null) : (
                  <TouchableOpacity onPress={()=>this.redirectFunc()} style = {styles.ButtonStyles} >
                    <FontAwesome5 name = "window-restore" size = {30} color = {'white'} />
                  </TouchableOpacity>
                )} 
                <TouchableOpacity onPress={()=>this.toggleTextChatModal()} style = {styles.ButtonStyles} >
                  <FontAwesome5 name = "comment" size = {30} color = {'white'} />
                </TouchableOpacity>
            </View>
          </OTSession>
          <Modal
              transparent={true}
              isVisible={this.state.isModalVisible}
              animationIn = {"slideInRight"}
              animationOut = {"slideOutRight"}
              animationInTiming = {300}
              animationOutTiming = {300}
              style = {MainStyles.chatRoomModalStyle}
          >
            {/* <TouchableOpacity 
                activeOpacity={1} 
                onPressOut={() => {this.toggleModal()}}
            > */}
              <View style = {MainStyles.chatroomModalViewStyle}>
                  <ScrollView style = {{width: "100%"}}>
                      <TouchableOpacity onPress = {() => this.toggleModal()} style = {{padding: 10, width: "100%"}} ><Text style = {{width: "100%", textAlign: "left", fontSize: LAYOUT.fontSize7 }}>×</Text></TouchableOpacity>
                      <View style={{flex: 1, width: "100%"}}>
                          <Collapse selectedRoomInfo={apiData} />
                      </View>
                  </ScrollView>
              </View>

            {/* </TouchableOpacity> */}
          </Modal>
          
          <Modal
              transparent={true}
              isVisible={this.state.isTextChatVisible}
              animationIn = {"slideInRight"}
              animationOut = {"slideOutRight"}
              animationInTiming = {300}
              animationOutTiming = {300}
              style = {MainStyles.chatRoomModalStyle}
          >
            {/* <TouchableOpacity 
                activeOpacity={1} 
                onPressOut={() => {this.toggleModal()}}
            > */}
              <SafeAreaView style={[styles.textChatContainer, MainStyles.chatroomModalViewStyle]}>
                <View style = {{marginTop: 0, backgroundColor: "#ffeea3", width: "100%"}}>
                  <View style={styles.headerOuterBlock}>
                    <View style={styles.headerBlock}>
                      <TouchableOpacity onPress = {() => this.toggleTextChatModal()} style={styles.goBackBlock}>
                        <View style={{paddingLeft: 20}}>
                          <FontAwesome name = "arrow-left" size = {30} color = {"white"} />
                        </View>
                      </TouchableOpacity>
                      <View style={{paddingLeft: 15}}>
                        <Text>Text Chat</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{marginBottom: 0, height: '80%', width: "100%"}}>
                    {<FlatList
                      extraData={this.state.refresh}
                      data={this.state.messages}
                      ref={ref => this.flatList = ref}
                      onContentSizeChange={(contentWidth, contentHeight)=>{        
                          this.flatList.scrollToEnd({animated: true});
                      }}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => this.userSelections(item)}
                    /> }
                  </View>
                  <View style={styles.footerBlockWrapper}>
                    <View style={styles.footerBlock}>
                      <View style={styles.searchInputBlockWrapper}>
                        <View style={styles.searchInputBlock}>
                          <TouchableOpacity style={{width: '100%'}}>
                            <TextInput
                              ref={c => { this.textInput = c}}
                              placeholder="Message"
                              value={this.state.text}
                              onChangeText={(text) => this.setState({text})}
                              style={styles.textStyle1}
                              placeholderTextColor={'#C8C8C8'}
                              onFocus={ () => this.textInput.setNativeProps({
                                  placeholderTextColor: '#696969'})
                              }
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.footerIconsWrapper}>
                        <View style={styles.footerIconsBlock}>
                          <TouchableOpacity onPress={() => this.sendSignal()} style={{width: 30, paddingLeft: 5}}>
                            <FontAwesome name="send-o" style={{color: theme.primaryColor, fontSize: 20}} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>  
              </SafeAreaView>

            {/* </TouchableOpacity> */}
          </Modal>
      </View>
    );
  }
}

const theme = {
  primaryColor: '#fc7474',
  secondaryColor: '#ffce00',
  constrastColor: '#4bacc6',
  chatBackground: '#ffeea3'
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: LAYOUT.window.width,
    height: LAYOUT.window.height,
  },
  TotalStyle: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  yourVideo: {
    width: LAYOUT.window.width,
    height: LAYOUT.window.height,
  },
  myVideo: {
    width: LAYOUT.window.width * 0.4,
    height: LAYOUT.window.width * 0.4,
    position: "absolute",
    right: 0,
    left: LAYOUT.window.width * 0.6,
    top: 10,
    zIndex: 999999999,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  toolButtonGroup: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: LAYOUT.window.width * 0.96,
    // height: 50,
    padding: LAYOUT.window.width * 0.03,
    left: LAYOUT.window.width * 0.02,
    zIndex: 9999999,
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  ButtonStyles: {
    width: (LAYOUT.window.width * 0.9 - 40 ) / 6,
    height: (LAYOUT.window.width * 0.9 - 40) / 6,
    borderRadius: 1000,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: 'blue',
    borderWidth: 3
  },
  textChatHistory: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textChatContainer: {
    // flex: 1,
    backgroundColor: '#f2f2f2'
  },
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerOuterBlock: {
    alignItems: 'center', 
    width: "100%",
    justifyContent: 'flex-end', 
    backgroundColor: theme.primaryColor
  },
  headerBlock: {
    flexDirection: 'row', paddingTop: 20, paddingBottom: 10, width: '100%'
  },
  goBackBlock: {
    width: 30, alignItems: 'center', justifyContent: 'center'
  },
  imgUser: {
    width: 50, height: 50, resizeMode: 'contain', borderRadius: 30, marginLeft: 10
  },
  nameText: {
    marginBottom: 2, color: '#fff', fontSize: 16, fontWeight: 'bold'
  },
  usernameText: {
    fontStyle: 'italic', marginBottom: 2, color: '#f2f2f2', fontSize: 14, fontWeight: 'normal'
  },
  menuIconBlock: {
    flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 20
  },
  menuIcon: {
    marginBottom: 2, color: '#f2f2f2', fontSize: 25, fontWeight: 'bold'
  },
  searchInputBlockWrapper: {
    flex: 7, justifyContent: 'center'
  },
  searchInputBlock: {
    backgroundColor: '#fff',  
    flexDirection: 'row', 
    borderWidth: 0,
    margin: 5,
    marginLeft: 20,
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    paddingLeft: 20,
    borderWidth: 0,
    borderColor: '#C8C8C8'
  },
  footerBlockWrapper: {
    marginBottom: 0, width: '100%', alignItems: 'flex-start', position: 'absolute', bottom: 10, backgroundColor: theme.chatBackground
  },
  footerBlock: {
    width: '100%', flexDirection: 'row'
  },
  footerIconsWrapper: {
    flex: 2, justifyContent: 'center'
  },
  footerIconsBlock: {
    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: 10
  },
  friendBlock: {
    flexDirection: 'row',  alignItems: 'flex-start', justifyContent: 'flex-start'
  },
  friendTimeBlock: {
    position: 'absolute', top: -15, left: 5, alignItems: 'flex-start', justifyContent: 'center', width: 100
  },
  userBlock: {
    flexDirection: 'row',  alignItems: 'center', justifyContent: 'flex-end'
  },
  userTimeBlock: {
    position: 'absolute', top: -15, right: 5, alignItems: 'flex-end', justifyContent: 'center', width: 100
  },
  timestampText: {
    fontSize: 10, fontStyle: 'italic', color: '#888888'
  },
  textStyle1: {
    color: '#696969', 
    fontSize: 14,
    fontWeight: 'normal'
  },
  agentMsgBlock: {
    marginLeft: 20, 
    backgroundColor: theme.secondaryColor, 
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingBottom: 10, 
    paddingTop: 10, 
    borderRadius: 10,
  },
  agentMsgText: {
    maxWidth: 200, 
    marginTop: 2, 
    color: '#696969', 
    fontWeight: 'normal', 
    fontSize: 13
  },
  userMsgBlock: {
    marginRight: 20, 
    backgroundColor: theme.primaryColor, 
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingBottom: 5, 
    paddingTop: 5, 
    borderRadius: 10
  },
  userMsgText: {
    maxWidth: 200, 
    marginTop: 2, 
    color: '#fff', 
    fontWeight: 'normal', 
    fontSize: 13
  },
});


const mapStateToProps = (state) => ({
  user:state.auth.user,
  room_info: state.chatroom
})

const mapDispatchToProps = {
  closedProviderCall
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)
