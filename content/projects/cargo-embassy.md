+++
title = "Cargo Embassy"
date = 2023-12-22
draft = false
interests = ["rust", "embedded", "tools"]
summary = "Get up and running with Embassy in seconds."
github = "https://github.com/AdinAck/cargo-embassy"
+++

Get up and running with Embassy in seconds.

## Features
- Supports STM32*, NRF*, and ESP32(C3/S3)
- Generates project structure
  - Toolchain
  - Probing
  - Dependencies
  - Profiles
  - Formatting

## TODO

Refer to the tracking issues for proposed changes.

## Usage

This utility will also create the cargo project, so wherever you would normally run `cargo new ...`, run:

```sh
cargo embassy init {project_name} args...
```

You can see how the `init` command works with:

```sh
cargo embassy init --help
```

To run the project, use:
```sh
cargo run
```

...or to deploy the project without RTT:
```sh
cargo embed
```

> `defmt` can be removed for production deployments by disabling the "debug" feature with `--no-default-features`.

## Examples

**Create a new Embassy project for the STM32G031K8:**
```sh
cargo embassy init my_project --chip stm32g031k8
```

**Create a new Embassy project for the NRF52840:**
```sh
cargo embassy init my_project --chip nrf52840
```

**Create a new Embassy project for the NRF52832_xxAA and Softdevice S132**
```sh
cargo embassy init my_project --chip nrf52832_xxAA --softdevice s132
```

**Create a new Embassy project for the ESP32S3**
```sh
cargo embassy init my_project --chip esp32s3
```
