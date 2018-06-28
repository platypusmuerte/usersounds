let fs = require('fs');
const path = require('path');
const appDataPath = process.env.APPDATA;
const scriptsPath = '/Firebot/firebot-data/user-settings/scripts/';
const soundsFolder = 'userSounds';

exports.getScriptManifest = () => {
	return {
		name: "UserSounds",
		description: "This script plays mp3 sounds that match the name of the user that clicked the button",
		version: "0.0.1",
		author: "PlatypusMuerte",
		website: "http://platypusmuerte.com"
	};
};

function getDefaultParameters() {
	return new Promise((resolve, reject) => {
		resolve({
			soundVol: {
				type: "number",
				description: "Sound volume (1-10)",
				default: 1
			}
		});
	});
}
exports.getDefaultParameters = getDefaultParameters;

function checkUserSoundFile(file) {
	return new Promise((resolve, reject) => {
		fs.readFile(file,(err,data) => {
			if(err) {
				resolve({exists: false, err: err});
			} else {
				resolve({exists: true});
			}
		});
	});
}

function run(runRequest) {
  let userName = runRequest.user.name.toLowerCase();
  let soundVol = runRequest.parameters.soundVol;
  
	return new Promise((resolve, reject) => {
		let response = {};
		let userSoundFile = path.join(appDataPath,scriptsPath + "/" + soundsFolder + "/" + userName + ".mp3");
				
		checkUserSoundFile(userSoundFile).then((fileCheck) => {
			if(fileCheck.exists) {
				response = {
					success: true,
					effects:[
						{
							type: EffectType.PLAY_SOUND,
							volume: soundVol,
							file: userSoundFile
						}
					]
				}
			} else {
				response = {
					success: true,
					effects:[
						{
							type: EffectType.CHAT,
							message: "You dont have a sound yet, sorry.",
							chatter: "Streamer",
							whisper: userName
						}
					]
				}
			}
			
			resolve(response);
		});
	});
}

exports.run = run;