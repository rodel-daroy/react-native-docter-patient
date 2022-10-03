  
import React, { Component } from 'react';
import { connect } from "react-redux"
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { LAYOUT } from '../../../constants';
import EHRSection from "./EHR";
import EncounterSection from "./encounter"
import NoteSection from "./note"

class PatientInfoCollaps extends Component {
    state = {
        activeSections: [0],
        collapsed: true,
    };

    CONTENT = this.props.user.role == "member" ? [
        {
          title: 'Demographic',
          content: <View style = {{width: "100%", padding: 20}}>
                <EHRSection 
                  selectedRoomInfo = {this.props.selectedRoomInfo}
                />
            </View>
        }
    ] : [
      {
        title: 'Demographic',
        content: <View style = {{width: "100%", padding: 20}}>
              <EHRSection 
                selectedRoomInfo = {this.props.selectedRoomInfo}
              />
          </View>
      },
      {
        title: 'Encounter',
        content: <View style = {{width: "100%", padding: 20}}>
              <EncounterSection />
          </View>,
      },
      {
        title: 'EHR',
        content: <View style = {{width: "100%", padding: 20}}>
              <NoteSection 
                selectedRoomInfo = {this.props.selectedRoomInfo}
              />
          </View>,
      }
  ];


    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    setSections = sections => {
        this.setState({
        activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        return (
        <Animatable.View
            duration={200}
            style={[styles.header, isActive ? styles.active : styles.inactive, {flexDirection: "row"}]}
            transition="backgroundColor"
        >   
            {isActive ? (
                <FontAwesome name = "caret-down" size = {20} style = {{justifyContent: "center", alignItems: "center", padding: 3, color: "black"}} />
                ) : (
                <FontAwesome name = "caret-left" size = {20} style = {{justifyContent: "center", alignItems: "center", padding: 3, color: "black"}} />
            )}
            
            <Text style={styles.headerText}>{section.title}</Text>
        </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {
        return (
        <View
            duration={200}
            // style={[styles.content, isActive ? styles.active : styles.inactive]}
            transition="backgroundColor"
        >
            {section.content}
        </View>
        );
    }

    render() {
    const { multipleSelect, activeSections } = this.state;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingTop: 5, width: "100%" }}>
                <Accordion
                    activeSections={activeSections}
                    sections={this.CONTENT}
                    touchableComponent={TouchableOpacity}
                    expandMultiple={multipleSelect}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                    duration={400}
                    onChange={this.setSections}
                />
            </ScrollView>
        </View>
        );
    }
}

const mapStateToProps = (state) => ({
  user:state.auth.user,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientInfoCollaps)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width: "100%"
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
    color: "black",

  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    width: "100%"
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});