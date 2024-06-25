---
title: 'Running Linux on a Chromebook'
description: "Making chromebooks actually useful"
pubDate: 'Jan 03 2024'
tags: ['tutorial']
---

A while ago I obtained a few dozen lightly-used Chromebooks from a business that didn't have a use for them anymore. While ChromeOS is *technically* a Linux distribution, it's heavily locked down and some apps that run natively on Linux don't behave well on it without subsystems. Fortunately, I was able to figure how to flash CoreBoot onto them, unlocking the ability to install any Linux distribution, or even Windows, with only some minor tinkering.

## Table of contents
- [Installation](#installation)
  - [Overview](#overview)
  - [Developer Mode](#developer-mode)
  - [Flashing Coreboot](#flashing-coreboot)
  - [Installing Linux](#installing-linux)
- [Usage tips](#usage-tips)
  - [Remapping super key](#remapping-super-key)
  - [Getting speakers working](#getting-speakers-working)
  - [Fractional scaling](#fractional-scaling)
  - [Fan control](#fan-control)
- [Installing Windows](#installing-windows)

## Installation

### Overview

Currently, the firmware is specifically designed to only load ChromeOS, so you cannot simply plug in a Linux USB and boot from it. We need to flash a custom UEFI/BIOS (Firmware) called Coreboot that will let us choose another boot device. However, there are hardware protections in place that makes it impossible to modify the firmware just from the OS. 

### Developer Mode

In order to make ChromeOS able to run commands as root (regardless of firmware protections), we need to enter developer mode. To do this
- Powerwash any existing users. `Ctrl` + `Alt` + `Shift` + `R` (Required, organization settings disable developer mode)
- Reboot, holding down `Power` + `Esc` + `Refresh`
- Press `Enter` to confirm that OS verification is off
- Any time you see "OS verification is off" warning message press `Ctrl` + `D` to enter developer mode
- Open a guest account
- Press `Ctrl` + `Alt` + `F2` to open a terminal
- Login with user `chronos`

### Flashing Coreboot

To turn off firmware protections, we need to unplug the battery and boot when it's directly plugged in. Unscrew the bottom of the chromebook, and use a screwdriver to pry open the case. There is a rainbow ribbon cable connecting the battery to the motherboard. Unplug it, and plug in the charger. With the case open, power on the device, open the terminal, and run the [firmware utility script](https://mrchromebox.tech/#fwscript)

```bash
cd
curl -LO mrchromebox.tech/firmware-util.sh
sudo bash firmware-util.sh
```
The first time, you will be prompted to turn off software firmware verification. Press Y and it will reboot automatically.

After a reboot, repeat the above commands again, and when prompted with a menu select `Install/Update UEFI (Full ROM) Firmware`. You will NEED to insert a usb key to save a backup of the firmware. 

### Installing Linux

Once flashed, Linux can now be installed normally, plug in a USB with a live image on it, press `Escape` while booting to open the boot menu, and select the USB. Follow the installation process depending on the distro.

## Usage tips
### Remapping super key

The Chromebooks do not come with a super key (EDIT: The search button works like the super key, leaving instructions here for posterity), which significantly degrades the GNOME experience. We can get around this by remapping right alt to left super. On Fedora:

```bash
sudo dnf update
sudo dnf install input-remapper
sudo systemctl enable --now input-remapper
```

Then open the input remapper tool. 

1. Select the keyboard
2. Click "new preset" (not the +New button at the top)
3. Click "Add"
4. Click "Record", and press the right alt key. 
5. Click "Key or Macro" in the Output section
6. Type "KEY_LEFTMETA" into the key box
7. Click "Apply"
8. Enable the "Autoload" toggle

<!-- <img src="https://user-images.githubusercontent.com/84288806/280539862-654738d8-5384-4155-ac62-a835b366885e.png" width=600> -->

### Getting speakers working

Linux can't detect the speakers because they integrate with ChromeOS weirdly, use this script to re-enable them again

```bash
cd ~/Downloads
git clone https://github.com/WeirdTreeThing/chromebook-linux-audio
cd chromebook-linux-audio
./setup-audio
sudo reboot
```

### Fractional scaling

Fedora disabled fractional scaling again because people were complaining it makes things blurry. Seems fine to me, use this to re-enable it

```bash
gsettings set org.gnome.mutter experimental-features "['scale-monitor-framebuffer']"
```

### Fan control

Without any modification, the fans will constantly run at about 50% power. There are two ways I've found to solve this, the first uses the command line, the second is a graphical interface.

**Method 1: Using ectool (recommended)**

Download the utility with curl

```bash
cd ~/Downloads
curl -LO tree123.org/files/utils/ectool
chmod +x ectool
sudo mv ectool /usr/bin
```

Then use it to automatically adjust the fans with `sudo ectool autofanctrl`. This will reset after a reboot. To run it automatically, add it to your crontab

```bash
sudo dnf install cronie
sudo crontab -e
```

And write to the file

```
@reboot /use/bin/ectool autofanctrl
```

**Method 2: Using [ChrultrabookController](https://github.com/death7654/Chrultrabook-Controller)**

Download the graphical app, from what I can see it isn't packaged in any normal repos
```bash
cd ~/Downloads
curl -LO https://github.com/death7654/Chrultrabook-Controller/releases/download/2.7.10/chrultrabook-controller_2.7.10_amd64.AppImage
chmod +x chrultrabook-controller_2.7.10_amd64.AppImage
./chrultrabook-controller_2.7.10_amd64.AppImage
```
This lets you modify curves and check system temps, as well as a few other things. You may have more trouble getting it to run in the background on startup though.

## Installing Windows

Windows can also be installed, while mostly normal, some things won't work due to driver problems. You will need to navigate the install entirely with the keyboard (press tab to navigate and space to select). You will also need to install the touchpad and other drivers manually, which can be found [here](https://coolstar.org/chromebook/windows-install.html) (select Acer i5-10210U Spin 713-2W).
