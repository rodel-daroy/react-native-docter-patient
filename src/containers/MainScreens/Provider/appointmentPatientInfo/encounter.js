import React from 'react';
import { connect } from "react-redux"
import { View, Text, ScrollView } from 'react-native';
import { DataTable } from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import MainStyles from "../../Style/MainStyle";
import { LAYOUT, COLOR } from '../../../../constants';
import { getAppointments } from "../../../../redux/actions/memberActions"

const itemsPerPage = 10;

export class BookedAppointments extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        numberOfPages: 0,
        page: 0,
        fromPage: 1,
        toPage: itemsPerPage,
        pageArray: [],
        BookedAppointmentArray: []
    }

    componentDidMount(){
        this.props.getAppointments({status: "booked"});
    }

    componentDidUpdate(prevProps) {
        if(prevProps.appointmentList !== this.props.appointmentList) {
            if(this.props.appointmentList.appointmentList) {
                var BookedAppointmentArray = this.props.appointmentList.appointmentList;
                if (BookedAppointmentArray.length > itemsPerPage){
                    var pageArr = [];
                    for(var i = 0; i < itemsPerPage; i ++){
                        pageArr.push(BookedAppointmentArray[i]);
                    }
                    this.setState({BookedAppointmentArray: BookedAppointmentArray, fromPage: BookedAppointmentArray.length > 0 ? 1 : 0, toPage: itemsPerPage, pageArray: pageArr});
                } else {
                    this.setState({BookedAppointmentArray: BookedAppointmentArray, fromPage: BookedAppointmentArray.length > 0 ? 1 : 0, toPage: BookedAppointmentArray.length, pageArray: BookedAppointmentArray});
                }
                // this.setSt
            } 
        }
    }

    setPage = (page) => {
        if(page * itemsPerPage >= this.state.BookedAppointmentArray.length){
            alert('This is last page.')
            return;
        }
        if((page + 1) * itemsPerPage > this.state.BookedAppointmentArray.length){
            var fromPage = itemsPerPage * page + 1;
            var toPage = itemsPerPage * page + this.state.BookedAppointmentArray.length % (itemsPerPage * page);
            var pageArr = [];
            for(var i = fromPage - 1; i < toPage; i ++){
                pageArr.push(this.state.BookedAppointmentArray[i])
            }
            this.setState({page: page, fromPage: fromPage, toPage: toPage, pageArray: pageArr});
        } else {
            var fromPage = itemsPerPage * page + 1;
            var toPage = itemsPerPage * (page + 1);
            var pageArr = [];
            for(var i = fromPage - 1; i < toPage; i ++){
                pageArr.push(this.state.BookedAppointmentArray[i])
            }
            this.setState({page: page, fromPage: fromPage, toPage: toPage, pageArray: pageArr});
        }
        // this.setState({page: page})
    }

    render(){
        return(
                <ScrollView>
                    <ScrollView horizontal = {true} showsVerticalScrollIndicator = {true} alwaysBounceVertical = {true} style = {{height: LAYOUT.height}}>
                        <DataTable style = {{width: LAYOUT.window.width * 1.5, height: "auto"}}>
                            <DataTable.Header>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Appointment Date</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Service Type</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Visit Type</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>BMI</DataTable.Title>
                                <DataTable.Title style = {MainStyles.tableCellStyle}>Note</DataTable.Title>
                            </DataTable.Header>
                            {this.state.pageArray.length > 0 ? this.state.pageArray.map((item, id) => {
                                return (
                                    <DataTable.Row key = {id + 'bookedAppointments'}>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{item.appointment_date}</DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{item.service_name_shortcut}</DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>
                                            {item.call_type == "Video Call" ? (
                                                <Icon name = "video-camera" size = {15}></Icon>
                                            ) : (
                                                <Icon name = "volume-up" size = {15}></Icon>
                                            ) }
                                        </DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{item.status}</DataTable.Cell>
                                        <DataTable.Cell style = {MainStyles.tableCellStyle}>{item.created_at}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }) : null}
                        </DataTable>
                    </ScrollView>
                    <DataTable.Pagination
                        page={this.state.page}
                        numberOfPages={this.state.numberOfPages}
                        onPageChange={page => this.setPage(page)}
                        label={`${this.state.fromPage}-${this.state.toPage} of ${this.state.BookedAppointmentArray.length}`}
                    />
                </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        appointmentList: state.member
    }
}

const mapDispatchToProps = {
    getAppointments
}

export default connect(mapStateToProps, mapDispatchToProps)(BookedAppointments)

