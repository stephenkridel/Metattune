import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	YellowBox
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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

		// using this variable to switch between icon families if needed
		this.iconFamily = AntDesign;

		// hasLoaded is different that status.isLoaded. Tells if everything
		// needed has loaded like soundbites and timers. isPlaying tells
		// if the user pressed the play button and wants the audio to play. Its
		// a safeguard against unforseen audio interuptions.
		this.state = {
			isPlaying: false,
			hasStarted: false,
			hasLoaded: false,
			btnIcon: 'rest',
			errorMsg: null,
			isError: false,
			soundbiteGotPaused: false,
			pausedAt: null
		};

		// Ignoring a warning for long timers (RN error 12981)
		YellowBox.ignoreWarnings(['Setting a timer']);
	}

	/* Use this if you want to use different icon families
	_iconFamilyChange = iconFamilyName => {
		return new Promise(resolve => {
			this.iconFamily = iconFamilyName;
			resolve();
		});
	};
	*/

	_errorHandler = (error, message) => {
		this.setState({
			errorMsg: message,
			isError: true
		});
		console.log(error);
	};

	_timerHandler = action => {
		switch (action) {
			case 'pauseAudio':
				// console.log(Date.now());
				this.timerInstances.forEach((element, index, array) => {
					if (
						(index !== array.length - 1 &&
							element.hasStarted &&
							!array[index + 1].hasStarted) ||
						(index === array.length - 1 && element.hasStarted)
					) {
						this.soundBitesArray[index].pauseAsync();
						// used to play the rest of the soundbite if it gets paused midway
						this.setState({
							soundbiteGotPaused: true,
							pausedAt: index
						});
					}
					// console.log(element.remaining);
					element.pause();
				});
				break;
			case 'stopAudio':
				this.timerInstances.forEach((element, index, array) => {
					if (
						(index !== array.length - 1 &&
							element.hasStarted &&
							!array[index + 1].hasStarted) ||
						(index === array.length - 1 && element.hasStarted)
					) {
						this.soundBitesArray[index].stopAsync();
					}
					element.stop();
				});
				break;
			case 'startAudio':
				this.timerInstances.forEach(element => {
					// used to play the rest of the soundbite if it gets paused midway
					if (this.state.soundbiteGotPaused) {
						this.soundBitesArray[this.state.pausedAt].playAsync();
						this.setState({
							soundbiteGotPaused: false,
							pausedAt: null
						});
					}
					element.start();
				});
				break;
			case 'unloadAudio':
				this.timerInstances.forEach((element, index) => {
					element.destroy();
					this.soundBitesArray[index].unloadAsync();
				});
				break;
			default:
				this._errorHandler(
					'Invalid case supplied to timerHandler',
					'Sorry, there was an error loading the audio'
				);
				break;
		}
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
			this.setState({ hasLoaded: false });

			let initialStatus;

			const { sound, status } = await Audio.Sound.createAsync(
				this.source,
				(initialStatus = {}),
				this._onPlaybackStatusUpdate
			);

			this.playbackInstance = sound;

			[
				this.timerInstances,
				this.soundBitesArray
			] = await this._soundBiteTimerSetup(this.soundBites);
			// changing the icon family and name simulataneously
			// this._iconFamilyChange(AntDesign).then(() => this.setState({btnIcon: 'caretright'}))
			this.setState({
				btnIcon: 'caretright',
				hasLoaded: true
			});
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
			this._loadAudio();
		}
		if (status.isLoaded) {
			// this is for when the audio pauses without the user pressing pause
			// this happens sometimes when other audio interupts the session
			if (this.state.hasLoaded) {
				if (status.isPlaying) {
					this.setState({ btnIcon: 'pause' });
				} else {
					if (this.state.isPlaying) {
						this._timerHandler('pauseAudio');
					}
					this.setState({
						isPlaying: false,
						btnIcon: 'caretright'
					});
				}
			}
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
					this.timerInstances !== null &&
					this.soundBitesArray !== null
				) {
					await this.playbackInstance.pauseAsync();
					// if timers have an issue stopping with the setOnPlaybackStatusUpdate
					// function, consider setTimeout(() => this.setState, 0) for the next line
					this.setState({ isPlaying: false });
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
					this.timerInstances !== null
				) {
					await this.playbackInstance.playAsync();
					// calling BackgroundTimer for IOS. Checking if the
					// session has started so that it's never called twice
					if (!this.state.hasStarted) {
						BackgroundTimer.start();
						this.setState({ hasStarted: true });
					}
					this._timerHandler('startAudio');
					this.setState({ isPlaying: true });
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
				this.timerInstances !== null
			) {
				BackgroundTimer.stop(); // calling BackgroundTimer for IOS
				this._timerHandler('stopAudio');

				await this.playbackInstance.stopAsync();

				this.setState({
					isPlaying: false,
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
		Audio.setAudioModeAsync({
			staysActiveInBackground: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			shouldDuckAndroid: true,
			playThroughEarpieceAndroid: false,
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true
		});
		this._loadAudio();
	};

	componentWillUnmount = () => {
		if (this.timerInstances !== null && this.soundBitesArray !== null) {
			this._timerHandler('unloadAudio');
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
						<AntDesign name='close' size={35} color='black' />
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
					<this.iconFamily
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
	Modal: {
		flex: 1,
		margin: 20,
		justifyContent: 'center'
	},
	ModalText: {
		fontSize: 40,
		color: 'black'
	},
	ModalClose: {
		marginTop: 30,
		marginRight: 30,
		alignSelf: 'flex-end'
	}
});
