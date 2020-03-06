import React from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'


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
	},
	container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
		backgroundColor: '#7a42f4',
		padding: 10,
		margin: 15,
		height: 40,
    },
    submitButtonText:{
		color: 'white'
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

		if (this.state.running_state === "work") {

			if (this.state.timerOn === false) {
			this.setState({
							timerOn: true,
							timerOn_text: pause_state_text,
							text: work_time_text,
							timerStart: this.state.timerTime,
							timerTime: this.state.timerTime,
							time: this.state.timerTime
					})

				this.timer = setInterval( () => {
					const newTime = this.state.timerTime - 10
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
		const { time, timerStart, timerOn } = this.state
		let seconds = ("0" + (Math.floor((time / 1000) % 60) % 60)).slice(-2)
		let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
		let hours = ("0" + Math.floor((time / 3600000) % 60)).slice(-2)

		return (
			<View style={[styles.clockContainer, styles.fill]}>				
				<Text>  {this.state.text}  </Text>
				<Text>  {this.state.time}    </Text>
				<Text>  {hours} : {minutes} : {seconds}    </Text>
				<Button onPress={() => this.startOrPauseTimer()} title={this.state.timerOn_text} />
				<Button onPress={() => this.resetTimer()} title="RESET" />
			</View>
		)
	}
}