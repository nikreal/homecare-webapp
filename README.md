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

# Issues during run the project

<a href="https://stackoverflow.com/questions/50836558/react-native-config-h-not-found"># Issue: Print: Entry, ":CFBundleIdentifier", Does Not Exist</a>

```
cd node_modules/react-native/third-party/glog-0.3.5/
./configure
make
cd ../../../..
react-native run-ios
```

<a href="https://zivost.com/blog/xcode-10-causes-haywire-for-react-native-developers/"># Issue: No member named '__rip' in '__darwin_i386_thread_state'; did you mean '__eip'?</a>

Run the following commands in the root of your react-native project.
```
cd node_modules/react-native/third-party/glog-0.3.x
./configure --host arm-apple-darwin
make
make install
```

Edit `node_modules/react-native/third-party/glog-0.3.4/src/config.h`<br><br>
Replace:
```
/* How to access the PC from a struct ucontext */
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip
```
With:
```
/* How to access the PC from a struct ucontext */
#if defined(__arm__) || defined(__arm64__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__pc
#else
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip
#endif
```
# Issue
<a href="https://github.com/kmagiera/react-native-gesture-handler/issues/343#issuecomment-468816796">Execution failed for task ':react-native-gesture-handler:compileDebugJavaWithJavac'.</a>