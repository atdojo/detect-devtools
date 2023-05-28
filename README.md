Devtool detection based on `debugger` and `webworkers`.

# Getting started
Install via npm
```bash
npm i detect-devtools
```
Or download  [detect-devtools.js](https://github.com/atdojo/detect-devtools/blob/main/detect-devtools.js)  
### Usage
```html
<script type="module">
    import { detectDevtools } from './detect-devtools.js'
    detectDevtools.addEventListener("change", (e) => {
        console.log("detectDevtools.isOpen " + e.detail.isOpen)
    })

    detectDevtools.startDetectDevtools()
    // detectDevtools.stopDetectDevtools()
</script>
```
### Configuration
```javascript
detectDevtools.startDetectDevtools({
    // time between pulses, which are sent from the webworker
    millisecondsBetweenPulse: 50,

    // the threshhold to detect if a pulse is missing. 
    // should be higher than millisecondsBetweenPulse, otherwise there will be false positives
    millisecondsLastPulseThreshhold: 100,
    
    // time between updating the detectDevtools object. 
    // its best to keep it the same value as millisecondsBetweenPulse
    millisecondsBetweenUpdate: 50,
    
    // time between the webworker gets restarted. This will rejump to the debugger statement, as a new Webworker gets started.
    // this can set really low to make devtools jump every x milliseconds to a debugger, which makes navigating in the devtools a pain/impossible. (There is probably an option to disable jumping to a debugger statement)
    millisecondsBetweenWorkerRestart: 100000000,
})
```

# Example configurations
### default
```javascript
detectDevtools.startDetectDevtools({
    millisecondsBetweenPulse: 50,
    millisecondsLastPulseThreshhold: 100, // this should be higher than millisecondsBetweenPulse, otherwise there will be false positives
    millisecondsBetweenUpdate: 50,
    millisecondsBetweenWorkerRestart: 100000000,
})
```
### fast detection
```javascript
detectDevtools.startDetectDevtools({
    millisecondsBetweenPulse: 10,
    millisecondsLastPulseThreshhold: 40, // this should be higher than millisecondsBetweenPulse, otherwise there will be false positives
    millisecondsBetweenUpdate: 50,
    millisecondsBetweenWorkerRestart: 100000000,
})
```
### slow detection
```javascript
detectDevtools.startDetectDevtools({
    millisecondsBetweenPulse: 100,
    millisecondsLastPulseThreshhold: 200, // this should be higher than millisecondsBetweenPulse, otherwise there will be false positives
    millisecondsBetweenUpdate: 50,
    millisecondsBetweenWorkerRestart: 100000000,
})
```