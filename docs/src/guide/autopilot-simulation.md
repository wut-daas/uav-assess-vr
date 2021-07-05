# Autopilot simulation

::: warning
Using the whole ArduPilot flight stack may be a bit challenging, and is overkill for many situations. It is advised to read more AP documentation if any problems occur.
:::

## Prerequisites

- [ArduPilot SiTL](https://ardupilot.org/dev/docs/sitl-simulator-software-in-the-loop.html), make sure to closely follow installation instructions.

::: tip
The following instrucions assume that you install SiTL in Linux (either netive or in a virtual machine). Any way of installing it will be OK, as long as you can communicate with the UE4 application over network. Generally, Linux installation tends to be much more convenient.
:::

::: tip
[PX4](https://px4.io/) can also be used, because it utilizes the same MAVLink protocol for communication. Just output the messages through UDP to the same port as when using Ardupilot.
:::

## Installation

After completing the SiTL setup you should have Git installed and know how to use it. If you decided to install SiTL in a different operating system than the UE4 application is running in, clone the `https://github.com/wut-daas/uav-assess-vr.git` repository.

Once the repository is downloaded, open its directory, then `sim-host` subdirectory. Copy the files to appropriate locations, you can find these in comments in the first line. At the time of writing these are:

```bash
mkdir -p ~/.mavproxy/joysticks/
cp frsky-usb.yml ~/.mavproxy/joysticks/

mkdir -p ~/.config/ardupilot/
cp locations.txt ~/.config/ardupilot/
```

## Running the simulation

After completing the setup, the following command can be used to start the simulation from any directory. Replace `UE4IP` with the IP address of the system running the UE4 application.

```bash
sim_vehicle.py -v ArduCopter -L EPPZ-oblot --out udp:UE4IP:54001
```

### Using MAVProxy

SiTL simulation will by default open [MAVProxy](https://ardupilot.org/dev/docs/copter-sitl-mavproxy-tutorial.html), which is ground control station software targeted at Ardupilot developers. When ssing SiTL, another terminal window opens, which is labelled XTerm, usually with a more dated appearance. Ignore this terminal, input all your commands into MAVProxy running in the system terminal you started the simulation from.

Loading these modules will probably be helpful:

```
module load joystick
module load console
module load map
```

Start the UE4 application. If everything was se up correctly, you shouldn't see the yellow `No MAVLink connection` indicator in the bottom right of the screen. Input the following commands into MAVProxy and observe the result in UE4.

```
mode guided
arm throttle
takeoff 2
```

In MAVProxy console window (a smaller GUI displaying status) you should see the Alt (altitude) value rising until it becomes around 2 meters. Meanwhile, in the UE4 application the drone should fluently move to the new altitude.

### Flying the UAV

If you have configured and connected a radio transmiter and loaded the `joystick` module, you can use it to fly the drone as usual. To be able to control it after automated takeoff, change the mode accordingly, e.g. to Loiter.

```
mode loiter
```

---

If you don't have any device to act as R/C, you can still use the automatic flight modes. For example, stay in mode Guided, and load `map` module if not already loaded. By right-clicking inside the map and selecting `Fly to`, you can see how the visualisation performs.
