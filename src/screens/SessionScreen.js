import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, LogBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import BackgroundTimer from 'react-native-background-timer';
import { Audio } from 'expo-av';
import {
	randomizeSoundBites,
	loadSoundBiteAudio,
	setupTimers
} from '../helpers/SoundBitesAndTimers';
import AsyncStorage from '@react-native-community/async-storage';
import ModalComponent from '../components/ModalComponent';

export default class SessionScreen extends Component {
	constructor(props) {
		super(props);

		this._isMounted = false;

		// collects the file and title props from SelectorModule.js
		const info = this.props.navigation.getParam('info');

		// destructuring info
		this.title = info.title;
		this.source = info.file;
		this.soundBites = info.soundBites;

		this.playbackInstance = null;

		this.soundBitesArray = null;
		this.timerInstances = null;

		// using this variable to switch between icon families if needed
		this.iconFamily = AntDesign;

		// hasLoaded is different that status.isLoaded. Tells if everything
		// needed has loaded like soundBites and timers. isPlaying tells
		// if the user pressed the play button and wants the audio to play. Its
		// a safeguard against unforseen audio interuptions.
		this.state = {
			isPlaying: false,
			hasStarted: false,
			hasLoaded: false,
			btnIcon: 'caretright',
			errorMsg: null,
			isError: false,
			soundBiteGotPaused: false,
			pausedAt: null,
			userExists: false
		};

		this.userData;
	}

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
				if (this.state.hasStarted) {
					// console.log(Date.now());
					this.timerInstances.forEach((element, index, array) => {
						if (
							(index !== array.length - 1 &&
								element.hasStarted &&
								!array[index + 1].hasStarted) ||
							(index === array.length - 1 && element.hasStarted)
						) {
							this.soundBitesArray[index].pauseAsync();
							// used to play the rest of the soundBite if it gets paused midway
							this.setState({
								soundBiteGotPaused: true,
								pausedAt: index
							});
						}
						element.pause();
						// console.log(element.remaining);
					});
				}
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
					// used to play the rest of the soundBite if it gets paused midway
					if (this.state.soundBiteGotPaused) {
						this.soundBitesArray[this.state.pausedAt].playAsync();
						this.setState({
							soundBiteGotPaused: false,
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
			this._errorHandler(error, 'Sorry, there was an error setting up the audio');
		}
	};

	_getUserToken = async () => {
		try {
			const userData = await AsyncStorage.getItem('userToken');
			if (userData == undefined) {
				this._isMounted ? this.setState({ userExists: false }) : null;
			} else {
				this._isMounted ? this.setState({ userExists: true }) : null;
				this.userData = JSON.parse(userData);
			}
		} catch (error) {
			this._errorHandler(error, 'Sorry there was an error loading data');
		}
	};

	_loadAudio = async () => {
		try {
			this.setState({ hasLoaded: false });

			Audio.setAudioModeAsync({
				staysActiveInBackground: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
				shouldDuckAndroid: true,
				playThroughEarpieceAndroid: false,
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true
			});

			let initialStatus = {};

			const { sound, status } = await Audio.Sound.createAsync(
				this.source,
				initialStatus,
				this._onPlaybackStatusUpdate
			);

			this.playbackInstance = sound;

			[this.timerInstances, this.soundBitesArray] = await this._soundBiteTimerSetup(
				this.soundBites
			);

			await this._getUserToken();

			this.setState({
				hasLoaded: true,
				btnIcon: 'caretright',
				soundBiteGotPaused: false,
				pausedAt: null
			});
		} catch (error) {
			this._errorHandler(error, 'Sorry, there was an error loading the audio');
		}
	};

	_onPlaybackStatusUpdate = status => {
		if (status.didJustFinish) {
			if (this.state.userExists) {
				this.userData.sessionsCompleted += 1;
			}
			this._timeListened();
			this._onStopPressed();
			this._timerHandler('unloadAudio');
			this._unloadAudio();
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
			// no throw statement because we want playbackInstance to be null
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
				this._errorHandler(error, 'Sorry, there was an error pausing the audio');
			}
		} else {
			try {
				if (this.playbackInstance !== null && this.timerInstances !== null) {
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
				this._errorHandler(error, 'Sorry, there was an error playing the audio');
			}
		}
	};

	_onStopPressed = async () => {
		try {
			if (this.playbackInstance !== null && this.timerInstances !== null) {
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
			this._errorHandler(error, 'Sorry, there was an error stopping the audio');
		}
	};

	_timeListened = async () => {
		await this._getUserToken();
		if (this.state.userExists) {
			try {
				this._timerHandler('pauseAudio');
				if (this.state.hasStarted && this.state.userExists) {
					let totalTimeListened = this.timerInstances[0].totalTimePlayed / 3600000;
					// console.log(this.timerInstances[0].totalTimePlayed / 3600000);
					this.userData.hoursCompleted += Math.round(totalTimeListened * 100) / 100;
					await AsyncStorage.setItem('userToken', JSON.stringify(this.userData));
				}
			} catch (error) {
				this._errorHandler(error, 'Sorry, we had a problem updating your user statistics');
			}
		}
	};

	componentDidMount = () => {
		this._isMounted = true;
		this._loadAudio();
	};

	componentWillUnmount = () => {
		this._isMounted = false;
		if (this.timerInstances !== null && this.soundBitesArray !== null) {
			this._timeListened().then(() => this._timerHandler('unloadAudio'));
		}
		this._unloadAudio();
	};

	render() {
		return (
			<View style={styles.Hero}>
				<ModalComponent
					isVisible={this.state.isError}
					message={this.state.errorMsg}
					onPressX={() => this.setState({ isError: false })}
					shouldShowButton={false}
				/>
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
					<View>
						<ActivityIndicator
							size='large'
							hidesWhenStopped={true}
							color='FFFFFF'
							animating={this.state.hasLoaded ? false : true}
						/>
						<this.iconFamily
							name={this.state.btnIcon}
							// you can use iconStyle = `{marginRight: #}` for margins
							style={this.state.hasLoaded ? styles.ShowIcon : styles.HideIcon}
							size={35}
						/>
					</View>
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
		fontSize: 35,
		color: 'rgb(30, 27, 57)',
		fontFamily: 'JosefinSans-Regular'
	},
	Module: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: 'rgb(30, 27, 57)'
	},
	ShowIcon: {
		color: 'white',
		position: 'absolute'
	},
	HideIcon: {
		display: 'none'
	}
});
