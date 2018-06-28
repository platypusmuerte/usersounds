let fs = require('fs');
const path = require('path');
const appDataPath = process.env.APPDATA;
const scriptsPath = '/Firebot/firebot-data/user-settings/scripts/';
const soundsFolder = 'userSounds';

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
							volume: 1,
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