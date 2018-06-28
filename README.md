# usersounds
Script used with Firebot to trigger a sound per user. Intended for Firebot scenes restricted to subs or patrons.

Clicking this button will cause Firebot to look for a mp3 file with the name of the user that clicked the button. It will either whisper the user that they do not have a sound, or it will attempt to play the sound.

## Setup
1. Extract the contents into the Firebot script directory.
2. Rename /userSounds/platypusmuerte.mp3 to your Mixer user name. Please name files all lowercase.
3. Add a custom script effect to a button, and select usersound.js as the script.
4. Set any desired timeouts on the button. (see Examples)

## Testing
To test it after Setup, connect Firebot if not already connected. Click the button in Mixer (not in Firebot). If you renamed the sound to match your username you should hear the sound play.

Rename the mp3 file to something different, and click the button again. Firebot should whisper you a message saying you do not have a sound.

## Use
I use this on a scene in Firebot that only my Patreon sponsors can get to. As I get a new Patron, I create a sound for them, or they provide me with one. I limit the sounds to a known length, and set a cooldown on the button for something greater than that value to prevent overlap of sounds.


