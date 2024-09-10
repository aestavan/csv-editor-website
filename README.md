# README
After installing Exhibit application onto Apple TV using Jamf, Change the app configuration to pull csv files from the csv folder on this server.

# Example App Configuration

<dict>
<key>edu.nebraska.ImageViewer.dataURL</key>
<string>http://ServerIP/atv/csv/$DEVICENAME.csv</string>
<key>edu.nebraska.ImageViewer.airplayDescription</key>
<string>Wirelessly send what's on your device to this display using AirPlay.</string>
<key>edu.nebraska.ImageViewer.airplaySubtitle</key>
<string>Please turn off Display after use</string>
<key>edu.nebraska.ImageViewer.deviceName</key>
<string>$DEVICENAME</string>
</dict>

# Example CSV Configuration

This is an example for an apple tv with the device name " DeviceName "

Name,URL,Duration,UpdateInterval,StartOn,EndBy,Cache
wallpaper1,http://ServerIP/atv/images/DeviceName/DeviceName-wallpaper1.png,00:48:52,01:00:00,1/1/2018 00:00,12/31/30 23:59,no
wallpaper2,http://ServerIP/atv/images/DeviceName/DeviceName-wallpaper2.png,00:48:52,01:00:00,1/1/2018 00:00,12/31/30 23:59,no
