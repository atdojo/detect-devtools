export namespace detectDevtools {
    export { stopDetectDevtools };
    export { startDetectDevtools };
    export { info };
    export { addEventListener };
    export { removeEventListener };
}
declare type DetectDevtoolsConfig = {
    millisecondsBetweenPulse: number,
    millisecondsLastPulseThreshhold: number,
    millisecondsBetweenUpdate: number,
    millisecondsBetweenWorkerRestart: number,
}
declare function stopDetectDevtools(): void;
declare function startDetectDevtools(config: DetectDevtoolsConfig): void;
declare namespace info {
    const isOpen: boolean | null;
}
declare function addEventListener(event: "change", callback: function): void;
declare function removeEventListener(event: "change", callback: function): void;
export {};
//# sourceMappingURL=detect-devtools.d.ts.map