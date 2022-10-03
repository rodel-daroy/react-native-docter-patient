import React from 'react';
import { connect } from "react-redux"
import { View, Text, TouchableOpacity, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from "react-native-paper"

import MainStyles from "../Style/MainStyle";
import { LAYOUT, COLOR } from '../../../constants';
import { setNavigator } from "../../../redux/actions/navigator";
import { noteSubmit } from "../../../redux/actions/ChatRoomActions";
import { getPatientNote } from "../../../redux/actions/providerActions";

export class ChatRoomNote extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cheifComplaint: "",
            hpi: "",
            currentMedician: "",
            allergiesIntolerance: "",
            surgicalHistory: "",
            hospitalizatiion: "",
            familyHistory: "",
            ros: "",
            vitals: "",
            pastResults: "",
            examination: "",
            assessment: "",
            treatment: "",
            procedures: "",
            immunizations: "",
            diagnosticImagging: "",
            labReports: "",
            procedureOrders: "",
            other: "",
            appointment_id: this.props.selectedRoomInfo.appt.id,
            patient_id: this.props.selectedRoomInfo.appt.patient_id
        }
    }
    
    componentDidMount() {
        StatusBar.setHidden(true);
        this.props.getPatientNote({
            appt_id: this.state.appointment_id,
            patient_id: this.state.patient_id
        });
    }

    componentDidUpdate(prevProps){
        setNavigator(this.props.navigation, 'thirdPage');
        if(this.props.note && prevProps !== this.props)
        {
            this.setState({
                cheifComplaint: this.props.note.chief,
                hpi: this.props.note.hpi,
                currentMedician: this.props.note.curr_medication,
                allergiesIntolerance: this.props.note.allergies_intolerance,
                surgicalHistory: this.props.note.surgical_history,
                hospitalizatiion: this.props.note.hospitalization,
                familyHistory: this.props.note.family_history,
                ros: this.props.note.ros,
                vitals: this.props.note.vitals,
                pastResults: this.props.note.past_results,
                examination: this.props.note.examination,
                assessment: this.props.note.assessment,
                treatment: this.props.note.treatment,
                procedures: this.props.note.procedures,
                immunizations: this.props.note.immunizations,
                diagnosticImagging: this.props.note.diagnostic_imaging,
                labReports: this.props.note.lab_reports,
                procedureOrders: this.props.note.procedure_orders,
                other: this.props.note.other
            });
        }
    }

    noteSubmit = () => {
        this.props.noteSubmit(this.state)
    }

    render(){
        return(
            <ScrollView>
                <View>
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Chief Complaint(s)"
                        Outlined = {true}
                        value = {this.state.cheifComplaint}
                        onChangeText = {(text) => this.setState({cheifComplaint: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="HPI"
                        Outlined = {true}
                        value = {this.state.hpi}
                        onChangeText = {(text) => this.setState({hpi: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Current Medician"
                        Outlined = {true}
                        value = {this.state.currentMedician}
                        onChangeText = {(text) => this.setState({currentMedician: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Allergies/Intolerance"
                        Outlined = {true}
                        value = {this.state.allergiesIntolerance}
                        onChangeText = {(text) => this.setState({allergiesIntolerance: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Surgical History"
                        Outlined = {true}
                        value = {this.state.surgicalHistory}
                        onChangeText = {(text) => this.setState({surgicalHistory: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Hospitaliztion"
                        Outlined = {true}
                        value = {this.state.hospitalizatiion}
                        onChangeText = {(text) => this.setState({hospitalizatiion: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Family History"
                        Outlined = {true}
                        value = {this.state.familyHistory}
                        onChangeText = {(text) => this.setState({familyHistory: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="ROS"
                        Outlined = {true}
                        value = {this.state.ros}
                        onChangeText = {(text) => this.setState({ros: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Vitals"
                        Outlined = {true}
                        value = {this.state.vitals}
                        onChangeText = {(text) => this.setState({vitals: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Past Results"
                        Outlined = {true}
                        value = {this.state.pastResults}
                        onChangeText = {(text) => this.setState({pastResults: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Examination"
                        Outlined = {true}
                        value = {this.state.examination}
                        onChangeText = {(text) => this.setState({examination: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Assessment"
                        Outlined = {true}
                        value = {this.state.assessment}
                        onChangeText = {(text) => this.setState({assessment: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Treatment"
                        Outlined = {true}
                        value = {this.state.treatment}
                        onChangeText = {(text) => this.setState({treatment: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Procedures"
                        Outlined = {true}
                        value = {this.state.procedures}
                        onChangeText = {(text) => this.setState({procedures: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Immunizations"
                        Outlined = {true}
                        value = {this.state.immunizations}
                        onChangeText = {(text) => this.setState({immunizations: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Dianostic Imagging"
                        Outlined = {true}
                        value = {this.state.diagnosticImagging}
                        onChangeText = {(text) => this.setState({diagnosticImagging: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Lab Reports"
                        Outlined = {true}
                        value = {this.state.labReports}
                        onChangeText = {(text) => this.setState({labReports: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Procedure Orders"
                        Outlined = {true}
                        value = {this.state.procedureOrders}
                        onChangeText = {(text) => this.setState({procedureOrders: text})}
                    />
                    <TextInput
                        style={styles.TextInput}
                        theme={{    
                            colors: { placeholder: COLOR.mainColor,  text: '#000000',  primary: COLOR.mainColor, underlineColor: 'transparent',  background: 'transparent'
                            }
                            }}
                        label="Other"
                        Outlined = {true}
                        value = {this.state.other}
                        onChangeText = {(text) => this.setState({other: text})}
                    />
                </View>
                <TouchableOpacity style={MainStyles.centerStyle} onPress={() => this.noteSubmit()}>
                    <Text style={MainStyles.Button}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        note:state.provider.note
    }
}

const mapDispatchToProps = {
    noteSubmit, getPatientNote
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomNote)



const styles = StyleSheet.create({
    TextInput: {
        // marginBottom: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#2a93c9',
        // height
    },
})