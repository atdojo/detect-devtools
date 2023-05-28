Devtool detection based on `debugger` and `webworkers`.

# Getting started
Download  [detect-devtools.js](https://github.com/atdojo/detect-devtools/blob/main/detect-devtools.js)
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
```html
<script type="module">
    import { detectDevtools } from './detect-devtools.js'
    detectDevtools.addEventListener("change", (e) => {
        console.log("detectDevtools.isOpen " + e.detail.isOpen)
    })

    detectDevtools.startDetectDevtools({
        millisecondsBetweenPulse: 50,
        millisecondsLastPulseThreshhold: 100, // this should be higher than millisecondsBetweenPulse, otherwise there will be false positives
        millisecondsBetweenUpdate: 50,
        millisecondsBetweenWorkerRestart: 100000000,
    })
    // detectDevtools.stopDetectDevtools()
</script>
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