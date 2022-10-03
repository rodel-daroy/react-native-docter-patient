import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Container} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import { Actions } from 'react-native-router-flux';

import MainStyles from "../Style/MainStyle";
import Header from "../Header/SecondHeader";
import Footer from "../Footer/PatientFooter"
import { LAYOUT, COLOR } from '../../../constants';
import { memberImageUpload } from "../../../redux/actions/memberActions"

export class MyPhoto extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        singleFile: {}
    }

    uploadImage = async () => {
        // Check if any file is selected or not
        if (this.state.singleFile != null) {
            // If file selected then create FormData
            const fileToUpload = this.state.singleFile;
            const formData = new FormData();
            formData.append("id",this.props.user.id)
            formData.append('image', {
                uri: fileToUpload.uri, 
                type: fileToUpload.type, 
                name: Math.floor(Math.random() * 1000000000000) + '.' + fileToUpload.name.split('.')[1],
            });
            this.props.memberImageUpload(formData);
        } else {
          alert('Please Select File first');
        }
    };


    
    selectFile = async () => {
        // Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                // Provide which type of file you want user to pick
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf ],
                // There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            this.setState({singleFile: res});
        } catch (err) {
            this.setState({singleFile: null});
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };

    render(){
        return(
            <Container style={MainStyles.container}>
                <Header 
                    headerText = {"Patient Photo"}
                    backURL = {"blank"}
                    backType = {"pop"}
                />
                    <View style={MainStyles.HeaderStyle}>
                        {/* <FontAwesome name="chevron-left" size={LAYOUT.window.width * 0.04} style={MainStyles.backIcon} onPress = {() => this.props.navigation.pop()} /> */}
                        {/* <Text style={MainStyles.HeaderText}>Upload Member Photo</Text> */}
                    </View>
                {/* </ImageBackground> */}
                <ScrollView>
                    <View style={MainStyles.main}>
                        <Image source = {{uri: this.state.singleFile.uri}} style = {{width: '100%', height: LAYOUT.window.width * 0.7, justifyContent: "center", alignItems: "center"}}></Image>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => this.selectFile()}>
                            <Text style={styles.buttonTextStyle}>Select File</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => this.uploadImage()}>
                            <Text style={styles.buttonTextStyle}>Upload File</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Footer />
            </Container>
        )
    }
}

// export default MyPhoto;
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = {
    memberImageUpload
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPhoto)



const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    buttonStyle: {
      backgroundColor: '#307ecc',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#307ecc',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    textStyle: {
      backgroundColor: '#fff',
      fontSize: 15,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      textAlign: 'center',
    },
  });
  