+++
title = "App"
draft = false
summary = "Comprehensive controls and monitoring in a SwiftUI app with BLE."
github = "https://github.com/AdinAck/Headlights-App"
weight = 3
+++

This repo contains the simple diagnostic app for the headlights.

This app demonstrates a few structures and concepts:
- BLE Router
- MVVM OTA
- Commonality

## BLE Router

This structure dynamically distributes BLE Devices to their appropriate views.

The first view where the headlight device was detected and connected to is part of the BLE Router.

```swift
struct ContentView: View {
    @StateObject private var scanner = BLERouter<Headlight>(scan: [Headlight.SERVICE_UUID], count: 1)

    @State var value = 55

    var body: some View {
        scanner.discovery { devices in
            if let first = devices.first {
                MainView()
                    .environmentObject(first)
            }
        }
    }
}
```

The router is completely generic and simple to use, simply provide it a device type, the advertised services to look for, and the number of devices to allow to connect at the same time.

In our case, this app only expects one headlight to be connected at once, so we only use the first device in the list of connected devices.

`MainView` is dispatched by the router when the device is connected, either by a user action, or an automatic action from user preferences.

## MVVM OTA

- MVVM stands for *Model-View View-Model*, it is the basis of SwiftUI's design.
- OTA stands for *Over the Air*

MVVM usually refers to views having access to states and updating themselves based on the changes to these states.

Well... why can't these states be sourced from a BLE peripheral?

So that's what I did, every state has a corresponding BLE characteristic that views can read and write from asynchronously.

## Commonality

This app needs to serialize and deserialize commands just like the embedded devices, but it would be a shame to write all that code again.

So, this app imports a local package called *Common* that was procedurally generated by the Rust code via an intermediary description language called UDL as part of the [uniffi](https://mozilla.github.io/uniffi-rs/) framework.

This means there is a Rust binary embedded into the Swift app, not to mention that Rust binary was extracted from the firmware.

So, when the firmware changes, the app changes accordingly!