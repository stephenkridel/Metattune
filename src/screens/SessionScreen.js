import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	YellowBox,
	AppState
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import {
	randomizeSoundBites,
	loadSoundBiteAudio,
	setupTimers
} from '../helpers/SoundBitesAndTimers.js';

export default class SessionScreen extends Component {
	constructor(props) {
		super(props);

		// collects the file and title props from SessionModule.js
		const info = this.props.navigation.getParam('info');

		this.title = info.title;
		this.color = info.color;
		this.source = info.file;
		this.soundBites = info.soundBites;

		this.playbackInstance = null;

		this.colorStyles = {
			backgroundColor: this.color
		};

		this.soundBitesArray = null;
		this.timerInstances = null;

		this.state = {
			isPlaying: false,
			hasPlayed: false,
			// the name for the arror icon is 'caretright'
			btnText: 'caretright',
			hasLoaded: false,
			errorMsg: 'Hello',
			isError: false,
			AppState: AppState.currentState
		};

		// Ignoring a warning for long timers (RN error 12981)
		YellowBox.ignoreWarnings(['Setting a timer']);
	}

	_errorHandler = (error, message) => {
		this.setState({
			errorMsg: message,
			isError: true
		});
		console.log(error);
	};

	_soundBiteTimerSetup = async array => {
		try {
			const result = await randomizeSoundBites(array);
			const nextResult = await loadSoundBiteAudio(result);
			const finalResult = await setupTimers(nextResult);
			return finalResult;
		} catch (error) {
			this._errorHandler(
				error,
				'Sorry, there was an error setting up the audio'
			);
		}
	};

	_loadAudio = async () => {
		try {
			const soundObject = new Audio.Sound();
			soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
			await soundObject.loadAsync(this.source);
			[
				this.timerInstances,
				this.soundBitesArray
			] = await this._soundBiteTimerSetup(this.soundBites);

			this.playbackInstance = soundObject;
			this.setState({ hasLoaded: true });
		} catch (error) {
			this._errorHandler(
				error,
				'Sorry, there was an error loading the audio'
			);
		}
	};

	_onPlaybackStatusUpdate = status => {
		if (status.didJustFinish) {
			this._onStopPressed();
		}
	};

	_unloadAudio = async () => {
		try {
			if (this.playbackInstance !== null) {
				await this.playbackInstance.unloadAsync();
				this.playbackInstance = null;
			}
			// no throw statement because we want playbackInstance to be null in the end
		} catch (error) {
			this._errorHandler(
				error,
				'Sorry, we experienced an error. This may cause future problems. If it does, close out of the app completely and reload it.'
			);
		}
	};

	_onPlayPausePressed = async () => {
		if (this.state.isPlaying) {
			try {
				if (
					this.playbackInstance !== null &&
					this.timerinstances !== null
				) {
					await this.playbackInstance.pauseAsync();
					this.timerInstances.forEach(element => element.stop());
					this.setState({
						isPlaying: false,
						btnText: 'caretright'
					});
				} else {
					throw 'playback instance or timer instance is null or undefined';
				}
			} catch (error) {
				this._errorHandler(
					error,
					'Sorry, there was an error pausing the audio'
				);
			}
		} else {
			try {
				if (
					this.playbackInstance !== null &&
					this.timerinstances !== null
				) {
					await this.playbackInstance.playAsync();
					this.timerInstances.forEach(element => element.start());
					this.setState({
						isPlaying: true,
						btnText: 'pause'
					});
				} else {
					throw 'playback instance or timer instance is null or undefined';
				}
			} catch (error) {
				this._errorHandler(
					error,
					'Sorry, there was an error playing the audio'
				);
			}
		}
	};

	_onStopPressed = async () => {
		try {
			if (
				this.playbackInstance !== null &&
				this.timerinstances !== null
			) {
				await this.playbackInstance.stopAsync();
				this.timerInstances.forEach(element => element.stop());
				this.setState({
					isPlaying: false,
					btnText: 'caretright'
				});
			} else {
				throw 'playback instance or timer instance is null or undefined';
			}
		} catch (error) {
			this._errorHandler(
				error,
				'Sorry, there was an error stopping the audio'
			);
		}
	};

	_handleAppStateChange = () => {
		this.setState({ isPlaying: true });
		this._onPlayPausePressed();
	};

	componentDidMount = () => {
		this._loadAudio();
		// listens for the app to go into background or foreground and then runs onPlayPausePressed
		// with isPlaying always true. This stops the timers so that they dont get off time.
		AppState.addEventListener('change', this._handleAppStateChange);
	};

	componentWillUnmount = () => {
		if (this.soundBitesArray != null) {
			this.soundBitesArray.forEach(async element => {
				element.unloadAsync();
			});
		}

		if (this.timerInstances != null) {
			this.timerInstances.forEach(element => {
				element.destroy();
			});
		}

		// had an error from using this.pauseAudio() as the second arg instead of this.pauseAudio
		AppState.removeEventListener('change', this._handleAppStateChange);

		this._unloadAudio();
	};

	render() {
		return (
			<View style={styles.Hero}>
				<Modal visible={this.state.isError} animationType='slide'>
					<TouchableOpacity
						style={styles.ModalClose}
						onPress={() => {
							this.setState({ isError: false });
						}}
					>
						<Text>Close</Text>
					</TouchableOpacity>
					<View style={styles.Modal}>
						<Text style={styles.ModalText}>
							{this.state.errorMsg}
						</Text>
					</View>
				</Modal>
				<Text style={styles.HeroText}>{this.title}</Text>
				<TouchableOpacity
					onPress={() => {
						this._onPlayPausePressed();
					}}
					// disables the button if the audio hasn't loaded
					disabled={this.state.hasLoaded ? false : true}
					// for different colors -> style={[styles.Module, this.colorStyles]}
					style={styles.Module}
				>
					<AntDesign
						name={this.state.btnText}
						size={35}
						color='white'
					/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	Hero: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	HeroText: {
		marginBottom: 30,
		fontSize: 25,
		fontWeight: 'bold'
	},
	Module: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: 'black'
	},
	ModuleText: {
		color: 'white',
		fontSize: 15
	},
	Modal: {
		flex: 1,
		margin: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ModalText: {
		fontSize: 40
	},
	ModalClose: {
		marginTop: 30,
		marginRight: 30,
		fontSize: 15,
		alignSelf: 'flex-end'
	}
});
