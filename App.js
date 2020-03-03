import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native'
//import {Constants} from 'expo'

let work_time = 5000
let break_time = 5000
let work_time_text = "WORK TIME"
let break_time_text = "BREAK TIME"
let start_state_text = "START"
let pause_state_text = "PAUSE"

const styles = StyleSheet.create({
	clockContainer:{
		flexDirection: 'row',
		alignItems: 'center'
	}
	/*appContainer: {
		//paddingTop: Constants.statusBarHight,
	}*/
})

export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
					work_time: work_time,
					break_time: break_time,
					work_time_text: work_time_text,
					break_time_text: break_time_text,
					timerOn: false,
					timerOn_text: start_state_text,
					text: work_time_text,
					timerStart: 0,
					timerTime: work_time,
					timerTime_const: work_time,
					breakTime: break_time,
					breakTime_const: break_time,
					running_state: "work",
					time: 0
				}
		}

	startOrPauseTimer() {

		if (this.state.TIMER[0].running_state === true) {

			this.setState({

				TIMER: this.state.TIMER.map(element =>  {
					if (element.element === null) return element

					return	{
						work_time: work_time,
						break_time: break_time,
						work_time_text: work_time_text,
						break_time_text: break_time_text,
						running_state: false,
						running_state_text: start_state_text,
						text: break_time_text,
						time: break_time
						}

			})
		})

	}
		else {

			this.setState({

				TIMER: this.state.TIMER.map(element =>  {
					if (element.element === null) return element

					return	{
						work_time: work_time,
						break_time: break_time,
						work_time_text: work_time_text,
						break_time_text: break_time_text,
						running_state: true,
						running_state_text: pause_state_text,
						text: work_time_text,
						time: work_time
						}

			})
		})	

	}
}



	render() {
		return (
			<View style={[styles.clockContainer, styles.fill]}>				
				<Text>  {this.state.TIMER[0].text}  </Text>
				<Text>  {this.state.TIMER[0].time}    </Text>
				<Button onPress={() => this.startOrPauseTimer()} title={this.state.TIMER[0].running_state_text} />
				<Button onPress={() => this.resetTimer()} title="RESET" />
			</View>

		)
	}
	
}