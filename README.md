# Introduction
<ul>
<li>Password and Url are saved in redux store.</li>
<li>React navigation is used for two screen - Settings Page, Webview page.</li>
<li>UI components are in <b>components</b> folder.</li>
<li><a href="https://www.npmjs.com/package/react-native-webview">react-native-webview</a> is used for <b>WebView</b>.</li>
<li><a href="https://www.npmjs.com/package/react-native-webview-cleaner">react-native-webview-cleaner</a> is used for clearing credential of website.</li>
<li>The start point is <b>App.js</b> in root folder</li>
</ul>

# Run project
```
npm install

react-native run-ios
react-native run-android
```
<a href="https://stackoverflow.com/questions/50836558/react-native-config-h-not-found"># Issue: Print: Entry, ":CFBundleIdentifier", Does Not Exist</a>

```
cd node_modules/react-native/third-party/glog-0.3.5/
./configure
make
cd ../../../..
react-native run-ios
```

