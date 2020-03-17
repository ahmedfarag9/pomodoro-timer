import React from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground} from 'react-native'
import {Vibrate} from './utils/vibrate.js'

// fixed variables
let work_time = (25 * 60 * 1000)
let break_time = (5 * 60 * 1000)
let work_time_text = "WORK TIMER"
let break_time_text = "BREAK TIMER"
let start_state_text = "START"
let pause_state_text = "PAUSE"

// style components
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
	
		// setting state values						
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
					time: work_time,
					Work_Time_Mins: 0,
					Work_Time_Secs: 0,
					Break_Time_Mins: 0,
					Break_Time_Secs: 0,
					newTimerValues: false
				}
		}

	// if start or pause button is pressed
	startOrPauseTimer() {

		// if user inputs new timer values  
		if (this.state.newTimerValues === true) {
			clearInterval(this.timer)
			this.setState({
				newTimerValues: false
			})
		}			

		// if timer is in work time
		if (this.state.running_state === "work") {

			// if timer is running
			if (this.state.timerOn === false) {
			this.setState({
							timerOn: true,
							timerOn_text: pause_state_text,
							text: work_time_text,
							timerStart: this.state.timerTime,
							timerTime: this.state.timerTime,
							time: this.state.timerTime
					})

				// decrease timer time every sec								
				this.timer = setInterval( () => {
					const newTime = this.state.timerTime - 10
					
					// if timer time is >= 1
					if (newTime >= 1) {
						this.setState({
							timerTime: newTime,
							time: newTime
						});
					
					// else if timer time = zero
					} else {
						
						// vibrate phone
						Vibrate()
						clearInterval(this.timer)
						this.setState({ 
								timerOn: false,
								running_state: "break" 
					})
						this.startOrPauseTimer()
						}
				}, 10);

			// else if timer is paused				
			} else {

				clearInterval(this.timer)
				this.setState({
							timerOn: false,
							timerOn_text: start_state_text,
			})
				}
		}

		
		if (this.state.running_state === "break") {
		
			if (this.state.timerOn === false) {
				this.setState({
							timerOn: true,
							timerOn_text: pause_state_text,
							text: break_time_text,
							timerStart: this.state.breakTime,
							breakTime: this.state.breakTime,
							time: this.state.breakTime
		})

				this.timer = setInterval( () => {
					const newTime = this.state.breakTime - 10
					if (newTime >= 0) {
						this.setState({
							breakTime: newTime,
							time: newTime
						});
					} else {
						Vibrate()
						this.resetTimer()
	}
				}, 10);

			} else {

				clearInterval(this.timer)
			this.setState({
							timerOn: false,
							timerOn_text: start_state_text,
							})
				}	
		}


	}

	resetTimer() {
			clearInterval(this.timer)
			this.setState({
						running_state: "work",
						timerOn: false,
						timerOn_text: start_state_text,
						text: work_time_text,
						timerTime: this.state.timerTime_const,
						time: this.state.timerTime_const,
						breakTime: this.state.breakTime_const,
						// timerStart: this.state.timerTime_const,
						})
						}


    handleWorkTimeMins = (Text) => {
		this.setState({ Work_Time_Mins: Number(Text) })
	}
    handleWorkTimeSecs = (Text) => {
		this.setState({ Work_Time_Secs: Number(Text) })
}
	handleBreakTimeMins = (Text) => {
		this.setState({ Break_Time_Mins: Number(Text) })
    }
    handleBreakTimeSecs = (Text) => {
		this.setState({ Break_Time_Secs: Number(Text) })
	}

    login = (Work_Time_Mins, Work_Time_Secs, Break_Time_Mins, Break_Time_Secs) => {

		let workManualTime = Work_Time_Secs * 1000 + Work_Time_Mins * 60 * 1000
		let breakManualTime = Break_Time_Secs * 1000 + Break_Time_Mins * 60 * 1000

		this.setState({
			running_state: "work",
			timerOn: false,
			timerOn_text: start_state_text,
			text: work_time_text,
			timerTime: workManualTime,
			timerTime_const: workManualTime,
			time: workManualTime,
			breakTime: breakManualTime,
			breakTime_const: breakManualTime,
			newTimerValues: true
			})
	}

	
	render() {
		const { time } = this.state
		let seconds = ("0" + (Math.floor((time / 1000) % 60) % 60)).slice(-2)
		let minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)

		return (
			<View style = {styles.container}>
				<ImageBackground source={require('')} style={{width: '100%', height: '100%'}}>
					<Text>Inside</Text>
				</ImageBackground>
				<Text>  {this.state.text}  </Text>
				<Text>  {minutes} : {seconds}    </Text>
				<Button onPress={() => this.startOrPauseTimer()} title={this.state.timerOn_text} />
				<Button onPress={() => this.resetTimer()} title="RESET" />

	            <TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Work Time Mins"
					placeholderTextColor = "#9a73ef"
					autoCapitalize = "none"
					keyboardType={'numeric'}
					onChangeText = {this.handleWorkTimeMins}/>
            
	            <TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Work Time Secs"
					placeholderTextColor = "#9a73ef"
					autoCapitalize = "none"
					keyboardType={'numeric'}
					onChangeText = {this.handleWorkTimeSecs}/>

	            <TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Break Time Mins"
					placeholderTextColor = "#9a73ef"
					autoCapitalize = "none"
					keyboardType={'numeric'}
					onChangeText = {this.handleBreakTimeMins}/>
            
	            <TextInput style = {styles.input}
					underlineColorAndroid = "transparent"
					placeholder = "Break Time Secs"
					placeholderTextColor = "#9a73ef"
					autoCapitalize = "none"
					keyboardType={'numeric'}
					onChangeText = {this.handleBreakTimeSecs}/>
            
	            <TouchableOpacity
					style = {styles.submitButton}
					onPress = {
					() => this.login(this.state.Work_Time_Mins, this.state.Work_Time_Secs, this.state.Break_Time_Mins, this.state.Break_Time_Secs)
					}>
					<Text style = {styles.submitButtonText}> Submit </Text>
	            </TouchableOpacity>
			</View>
		)
	}
}