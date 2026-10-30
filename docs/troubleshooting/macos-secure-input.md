# Shortcuts stopped working on macOS (Secure Input)

macOS turns on **Secure Input** while you type in a password field, and some apps
(for example password managers, or Terminal with _Secure Keyboard Entry_) keep it
on. While it is on, no app can receive global shortcuts, so lowyap cannot hear
your dictation shortcut.

lowyap shows a warning and, when it can, the name of the app holding Secure Input.

## Fix

1. Leave the password field, or quit or switch away from the app named in the warning.
2. In Terminal or iTerm, turn off **Secure Keyboard Entry** in the app menu.
3. Still blocked? Find the app holding it:
   ```bash
   ioreg -l -w 0 | grep -o '"kCGSSessionSecureInputPID"=[0-9]*'
   ```
   Then look up the PID in Activity Monitor and quit that app.
4. As a last resort, lock the screen and unlock it again, or log out and back in.

lowyap never asks you to turn off macOS security features.
