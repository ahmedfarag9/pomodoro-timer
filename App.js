import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native'
import {Constants} from 'expo'

let work_time = "25"
let break_time = "5"
let work_time_text = "WORK TIMER"
let break_time_text = "BREAK TIMER"
let start_state_text = "START"
let pause_state_text = "PAUSE"


const styles = StyleSheet.create({
	clockContainer:{
		flexDirection: 'row',
		alignItems: 'center'
	},
	appContainer: {
		//paddingTop: Constants.statusBarHight,
	}
})


