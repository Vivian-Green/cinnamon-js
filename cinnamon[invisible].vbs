Set oShell = CreateObject("WScript.Shell")
Dim strArgs
strArgs = "cmd /c cinnamon[invisible].bat"
oShell.Run strArgs, 0, false