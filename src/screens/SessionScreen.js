import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	YellowBox
} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import BackgroundTimer from 'react-native-background-timer';
import { Audio } from 'expo-av';
import {
	randomizeSoundBites,
	loadSoundBiteAudio,
	setupTimers
} from '../helpers/SoundBitesAndTimers.js';

export default class SessionScreen extends Component {
	constructor(props) {
		super(props);

		// collects the file and title props from SelectorModule.js
		const info = this.props.navigation.getParam('info');

		// destructuring info
		this.title = info.title;
		// this.color = info.color;
		this.source = info.file;
		this.soundBites = info.soundBites;

		this.playbackInstance = null;

		/* use this for different color play buttons
		this.colorStyles = {
			backgroundColor: this.color
		};
		*/

		this.soundBitesArray = null;
		this.timerInstances = null;

		// using this variable to switch between Feather and AntDesign icons
		this.IconFamily = Feather;

		this.state = {
			isPlaying: false,
			hasStarted: false,
			btnIcon: 'loader',
			hasLoaded: false,
			errorMsg: 'Hello',
			isError: false
		};

		// Ignoring a warning for long timers (RN error 12981)
		YellowBox.ignoreWarnings(['Setting a timer']);
	}

	_iconNameChange = iconName => {
		return new Promise(resolve => {
			this.setState({
				btnIcon: iconName
			});
			resolve();
		});
	};

	_iconFamilyChange = IconFamilyName => {
		return new Promise(resolve => {
			this.IconFamily = IconFamilyName;
			resolve();
		});
	};

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
			Audio.setAudioModeAsync({
				staysActiveInBackground: true,
				interruptionModeAndroid:
					Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
				shouldDuckAndroid: true,
				playThroughEarpieceAndroid: false,
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
				playsInSilentModeIOS: true
			});

			const { sound, status } = await Audio.Sound.createAsync(
				this.source,
				this._onPlaybackStatusUpdate
			);

			this.playbackInstance = sound;

			[
				this.timerInstances,
				this.soundBitesArray
			] = await this._soundBiteTimerSetup(this.soundBites);

			// changing the icon family and name simulataneously
			Promise.all([
				this._iconFamilyChange(AntDesign),
				this._iconNameChange('caretright')
			]);
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
					this.timerInstances.forEach(element => element.stop());
					await this.playbackInstance.pauseAsync();
					this.setState({
						isPlaying: false,
						btnIcon: 'caretright'
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

					// calling BackgroundTimer for IOS. Checking if the
					// session has started so that it's never called twice
					if (!this.state.hasStarted) {
						BackgroundTimer.start();
						this.setState({ hasStarted: true });
					}

					this.timerInstances.forEach(element => element.start());

					this.setState({
						isPlaying: true,
						btnIcon: 'pause'
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
				BackgroundTimer.stop(); // calling BackgroundTimer for IOS
				this.timerInstances.forEach(element => element.stop());

				await this.playbackInstance.stopAsync();

				this.setState({
					isPlaying: false,
					btnIcon: 'caretright',
					hasStarted: false
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

	componentDidMount = () => {
		this._loadAudio();
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
					<this.IconFamily
						name={this.state.btnIcon}
						// you can use iconStyle = `{marginRight: #}` for margins
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
		fontWeight: 'bold',
		color: 'black'
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
