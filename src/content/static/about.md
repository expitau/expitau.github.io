# About me
## Hello!


My name is Nathan, I'm a highly motivated software developer with several years of professional experience and a proven ability to write high-quality maintainable code when I can, and fast solution-oriented programs when I must.

I am currently in my 4A term of studying Computational Mathematics at the University of Waterloo. When I'm not contributing to open source or tinkering with hardware, I spend time working on my many personal projects, some of which you can find on <a href="https://github.com/expitau">my GitHub</a>

## Technologies

I've worked with dozens of different technologies, and I'm always keen to pick up more. This is not an exhaustive list, in no particular order. 

## Tech Stack
### Software
**OS | [Fedora Linux](https://fedoraproject.org/)** -- This is an amazing operating system, it's stable, responsive, and I like GNOME (for now...). My dream is to switch to [Fedora Silverblue](https://fedoraproject.org/silverblue/) one day, building my desktop as an OCI container in the cloud and pulling in updates immutably. However, container diffs are a blocker for this at the moment (See [#902](https://github.com/containers/image/pull/902)).

**IDE | [VSCode](https://code.visualstudio.com/)** -- VSCode is an amazing editor, and while I've found it to be a bit slow (for a text editor haha), I love the seamless remote development integration, which is a dealbreaker for me in any other editor.

**Subsystem | [Docker](https://docker.com/)** -- When switching to Linux from Windows, I missed WSL2. The ability to have a work environment where I could install programs freely without worrying about breaking my system was great. Fortunately, I was able to recreate this (and more!) with pure Docker containers. They integrate seamlessly with VSCode and allowed me to develop with Ubuntu for my previous job (so people couldn't blame me for using a different environment when things broke) and Arch for my personal projects (so I get the most up-to-date software without resorting to manually adding repos).

**Shell prompt | [Trueline](https://github.com/petobens/trueline)** -- I wanted to like [starship.rs](https://starship.rs/), I wanted to like [powerlevel10k](https://github.com/romkatv/powerlevel10k), but the config and installation was too annoying to maintain across different environments. Trueline works exactly how I want it to (almost) out of the box, and I can copy a single bash file around to get the prompt anywhere.

I also add the following to my `.bashrc` for a better experience across different terminal emulators:

```bash
setopt menu_complete  # Tab autocomplete
unsetopt auto_list    # Don't list options on tab
bindkey  "^[[H"  beginning-of-line  # Home key
bindkey  "^[[F"  end-of-line        # End key
bindkey  "^[[3~"  delete-char       # Delete key
```

### Gnome extensions
- **Blur my shell** -- pretty!
- **Tiling Assistant** -- quarter tiling so good you'd think it was built-in
- **Caffeine** -- I use it more than I thought I would
- **Clipboard Indicator** -- not perfect, I wish there was something closer to Windows' clipboard history. Maybe I'll write my own!
- **Color Picker** -- great, works identical to the [Powertoy on Windows](https://learn.microsoft.com/en-us/windows/powertoys/color-picker)
- ~~**Dash to Panel**~~ -- if you're coming from Windows and want this, it's amazing. I prefer stock GNOME though
- **GSConnect** -- meh. It works, but isn't super useful
- **Just Perfection** -- a few UI tweaks

![Laptop on desk]( /laptop-on-desk.jpg "Laptop on desk" )  

<div style="text-align: center; font-style: italic; margin-top: -1rem;">Photo credit: Phil Barker</div>

### Hardware
**Laptop | Dell XPS 17 9720** -- This is my current daily driver. Its performance has been more than sufficient for my use, and I've encountered none of the heating issues that I had with my previous (Lenovo T490) laptop. It looks amazing, and the keyboard and trackpad feel great. However, the webcam leaves some to be desired, and I miss my ethernet / HDMI / USB-A ports. When docked at home, I connect it to two external displays with a Dell USB hub (unfortunately, Dell's got me locked in to a 130W hub), which works great but definitely isn't worth the price.

**Displays | Asus VA24E** -- I have two of these monitors, and they're great. They're cheap, and the colours are good enough for my use. I've set them up with a dual-monitor arm from Amazon, and they can comfortably sit in any position. I wish they had DisplayPort, but I got the two of them for about $200 so I can't complain.

**Mouse | MX Master 3** -- I've been using this mouse for a few months now, and I love it. The scroll wheel is amazing, and it's super comfortable. While pricey, I don't regret the investment.

**Phone | Pixel 4a** -- This phone works great, I love the fingerprint sensor placement, and the camera is more than enough for me. It's been going strong for about 2-3 years now, and I'm going to hold onto it as long as I can.

**Earbuds | Jabra Elite 4** -- My first earbuds, that I use on occasion. They're cheap, sound great, and are reasonably comfortable (though I haven't used many other earbuds).
