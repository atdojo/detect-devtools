const defaultConfig = {
    millisecondsBetweenPulse: 50,
    millisecondsLastPulseThreshhold: 100,
    millisecondsBetweenUpdate: 50,
    millisecondsBetweenWorkerRestart: 100000000, // = 27,777.. hours
}

const info = {
    isOpen: undefined
}

let updateDevtoolsInterval
let webworkerRestartInterval
let webworker
let lastPulseReceivedFromWebworker = 0
let eventTarget = new EventTarget()

function createWebworkerWithCode(code) {
    const blob = new Blob([code], {
        type: 'text/javascript'
    })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    URL.revokeObjectURL(url)
    return worker
}

function onWebworkerMessage() {
    lastPulseReceivedFromWebworker = Date.now()
}

function restartWebworker(code) {
    terminateWebworker()
    webworker = createWebworkerWithCode(code)
    webworker.onmessage = onWebworkerMessage
}

function terminateWebworker() {
    if (webworker) {
        webworker.terminate()
    }
}

function startDetectDevtools(config) {
    const mergedConfig = {
        ...defaultConfig,
        ...(config || {})
    }

    const workerCode = `
            function pulse() {
                debugger
                postMessage("pulse")
            }
            const intervalId = setInterval(pulse, ${mergedConfig.millisecondsBetweenPulse})
        `

    restartWebworker(workerCode)
    webworkerRestartInterval = setInterval(() => {
        restartWebworker(workerCode)
    }, mergedConfig.millisecondsBetweenWorkerRestart)
    updateDevtoolsInterval = setInterval(() => {
        const oldOpenState = info.isOpen
        const diff = Date.now() - lastPulseReceivedFromWebworker
        info.isOpen = diff > mergedConfig.millisecondsLastPulseThreshhold
        if (oldOpenState !== info.isOpen) {
            eventTarget.dispatchEvent(
                new CustomEvent('change', { detail: info })
            )
        }
    })
}

function stopDetectDevtools() {
    clearInterval(webworkerRestartInterval)
    clearInterval(updateDevtoolsInterval)
    terminateWebworker()
}

const addEventListener = eventTarget.addEventListener.bind(eventTarget)
const removeEventListener = eventTarget.removeEventListener.bind(eventTarget)

const detectDevtools = {
    stopDetectDevtools, startDetectDevtools, info, addEventListener, removeEventListener
}

export { detectDevtools }

