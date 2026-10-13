## Hello!

My name is Nathan, and I'm a software developer based in Toronto, Canada. 

## "expitau"?

You'll probably see my handle "expitau" on my website, email, and github. It's inspired by Euler's formula!

$$
e^{ix} = \cos(x) + i\sin(x)
$$

When we evaluate this expression at $\tau$ (where $\tau = 2\pi$), this formula simplifies to $\text{exp}(i \tau) = 1$ (read "exp i tau equals 1"). Euler's formula is a beautiful, elegant solution to a complex mathematical problem. It seamlessly bridges the seemingly unrelated worlds of calculus, trigonometry, and complex numbers. I believe that complex challenges often have an underlying simplicity, and code should look to unearth this simplicity to be readable, maintainable, and efficient.

## Software
#### OS | [NixOS](https://nixos.org/)

NixOS is the worst operating system from 50 years in the future. Over the past couple years, I've progressively made all of my tooling more and more deterministic. Even when I still used Windows years ago, I had setup scripts and would frequently factory reset my computer to a "clean" state. I've created [my own Arch-based immutable distribution](https://github.com/expitau/expitau-os), but it just can't compete with the speed and reliability of the /nix store. 

#### IDE | [VSCode](https://code.visualstudio.com/)

VSCode is an amazing editor, and while I've found it to be a bit slow (for a text editor haha), I love the seamless remote development integration, which is a dealbreaker for me in any other editor.

#### Subsystem | [Incus](https://linuxcontainers.org/incus/)

When I initially switched from Windows to Linux, I actually missed WSL2. The ability to have a work environment where I could install programs freely without worrying about breaking my system was great. Fortunately, I was able to recreate this (and more!) with pure containers. They integrate seamlessly with VSCode and allowed me to develop with Ubuntu for work (so people couldn't blame me for using a different environment when things broke) and Arch for my personal projects (so I get the most up-to-date software without resorting to manually adding repos). Plus, in contrast to virtual machines, they can start up nearly instantly, are deterministic, and don't use any memory while idle.

#### Shell prompt | [Custom bashrc](https://github.com/expitau/expitau-os/blob/nixos/configurations/formic/home/home.nix)

I wanted to like [starship.rs](https://starship.rs/), I wanted to like [powerlevel10k](https://github.com/romkatv/powerlevel10k), but the config and installation was too annoying to maintain across different environments. I used [trueline.sh](https://github.com/petobens/trueline) for a bit, but even it became too cumbersome. Sometimes the simplest solution is best, so I just wrote my own.

```bash

bind '"\t":menu-complete'

alias ls='ls --color=auto'
alias grep='grep --color=auto'

prompt_command() {
    local STATUS=$?;
    local BRANCH=$(git branch --show-current 2>/dev/null);
    
    PS1="\n╭─ \w";
    [ -n "$BRANCH" ] && PS1+=" \[\e[38;5;248m\]$BRANCH\[\e[0m\]";
    [ "$STATUS" -ne 0 ] && PS1+=" \[\e[38;5;203m\]$STATUS\[\e[0m\]";
    
    PS1+="\n╰ ";
    
    # Custom coloured prompt symbol based on environment
    if [[ "$(uname -n)" == *dev* ]]; then
        PS1+="\[\e[38;5;75;1m\]λ\[\e[0m\] ";
    elif [[ "$(uname -n)" == *work* ]]; then
        PS1+="\[\e[38;5;208m\]λ\[\e[0m\] ";
    elif [ -n "$SSH_CLIENT" ] || [ -n "$SSH_TTY" ]; then
        PS1+="\[\e[38;5;71;1m\]λ\[\e[0m\] ";
    elif [ "$(whoami)" = "root" ]; then
        PS1+="\[\e[38;5;203;1m\]λ\[\e[0m\] ";
    else
        PS1+="\[\e[38;5;141;1m\]λ\[\e[0m\] ";
    fi
}

PROMPT_COMMAND='prompt_command'
```

### Gnome extensions
- **Blur my shell**

    Very pretty and has a lot of options now! This is a must-have for me.
- **Caffeine**
    
    I use it more than I thought I would
- **Color Picker**
    
    Great, works identical to the [Powertoy on Windows](https://learn.microsoft.com/en-us/windows/powertoys/color-picker)
- **GSConnect**

    It works, but isn't super useful

## Hardware
#### Laptop | Dell XPS 17 9720

This is my current daily driver. Its performance has been more than sufficient for my use, and I've encountered none of the heating issues that I had with my previous (Lenovo T490) laptop. It looks amazing, and the keyboard and trackpad feel great. However, the webcam leaves some to be desired, and I miss my ethernet / HDMI / USB-A ports. When docked at home, I connect it to two external displays with a Dell USB hub (unfortunately, Dell's got me locked in to a 130W hub), which works great but definitely isn't worth the price.

#### Displays | Asus VA24E

I have two of these monitors, and they're great. They're cheap, and the colours are good enough for my use. I've set them up with a dual-monitor arm from Amazon, and they can comfortably sit in any position. I wish they had DisplayPort, but I got the two of them for about $200 so I can't complain.

#### Mouse | MX Master 4s

This is the best mouse. It's expensive, but its quality is incredible and I am thoroughly addicted to hyperscroll.

#### Phone | Pixel 6 Pro w/ GrapheneOS

I've installed [GrapheneOs](https://grapheneos.org/) on this and it's been a pretty great experience. While I do miss tap-to-pay and call screening a bit, the privacy (and battery life) improvements are fantastic.

## Tech Stack
I've used a lot of technologies, so it's very challenging to make a comprehensive list. Here are a few I've worked with:

<details>
  <summary><strong>Programming Languages (click to expand)</strong></summary>

###### Web Programming Languages
![Javascript Badge](https://img.shields.io/badge/-Javascript-3B4252?logo=javascript&style=flat)
![Typescript Badge](https://img.shields.io/badge/-Typescript-3B4252?logo=typescript&style=flat)
![PHP Badge](https://img.shields.io/badge/-PHP-3B4252?logo=php&style=flat)
![CSS3 Badge](https://img.shields.io/badge/-CSS3-3B4252?logo=css3&style=flat)
![SASS Badge](https://img.shields.io/badge/-SASS-3B4252?logo=sass&style=flat)
![HTML5 Badge](https://img.shields.io/badge/-HTML5-3B4252?logo=html5&style=flat)

###### Application Programming Languages
![C# Badge](https://img.shields.io/badge/-C%20Sharp-3B4252?logo=c-sharp&style=flat)
![Java Badge](https://img.shields.io/badge/-Java-3B4252?logo=openjdk&style=flat)

###### Scripting Programming Languages
![Python Badge](https://img.shields.io/badge/-Python-3B4252?logo=python&style=flat)
![Node Badge](https://img.shields.io/badge/-Node.js-3B4252?logo=node.js&style=flat)
![GNU Badge](https://img.shields.io/badge/-GNU%20Bash-3B4252?logo=gnu-bash&style=flat)
![R Badge](https://img.shields.io/badge/-R-3B4252?logo=r&style=flat)
![Powershell Badge](https://img.shields.io/badge/-Powershell-3B4252?logo=powershell&style=flat)
![AutoHotkey Badge](https://img.shields.io/badge/-AutoHotkey-3B4252?logo=autohotkey&style=flat)

###### Foundational Programming Languages
![Rust Badge](https://img.shields.io/badge/-Rust-3B4252?logo=rust&style=flat)
![C Badge](https://img.shields.io/badge/-C-3B4252?logo=c&style=flat)
![C++ Badge](https://img.shields.io/badge/-C++-3B4252?logo=c%2B%2B&style=flat)

###### Markdown & Configuration Languages
![Markdown Badge](https://img.shields.io/badge/-Markdown-3B4252?logo=markdown&style=flat)
![YAML Badge](https://img.shields.io/badge/-YAML-3B4252?logo=yaml&style=flat)
![JSON Badge](https://img.shields.io/badge/-JSON-3B4252?logo=json&style=flat)
![TOML Badge](https://img.shields.io/badge/-TOML-3B4252?logo=toml&style=flat)
![XML Badge](https://img.shields.io/badge/-XML-3B4252?logo=xml&style=flat)
![INI Badge](https://img.shields.io/badge/-INI-3B4252?logo=ini&style=flat)
![CSV Badge](https://img.shields.io/badge/-CSV-3B4252?logo=csv&style=flat)
</details>

<details>
  <summary><strong>Libraries and Frameworks (click to expand)</strong></summary>

###### Web Frameworks
![Vue Badge](https://img.shields.io/badge/-Vue.js-3B4252?logo=vue.js&style=flat)
![React Badge](https://img.shields.io/badge/-React-3B4252?logo=react&style=flat)
![Svelte Badge](https://img.shields.io/badge/-Svelte-3B4252?logo=svelte&style=flat)
![Astro Badge](https://img.shields.io/badge/-Astro-3B4252?logo=astro&style=flat)
![Electron Badge](https://img.shields.io/badge/-Electron-3B4252?logo=electron&style=flat)

###### Web Libraries
![Tailwind Badge](https://img.shields.io/badge/-Tailwind%20CSS-3B4252?logo=tailwind-css&style=flat)
![Bootstrap Badge](https://img.shields.io/badge/-Bootstrap-3B4252?logo=bootstrap&style=flat)
</details>


<details>
  <summary><strong>Ops & Deployment (click to expand)</strong></summary>

###### Databases
![MongoDB Badge](https://img.shields.io/badge/-MongoDB-3B4252?logo=mongodb&style=flat)
![MySQL Badge](https://img.shields.io/badge/-MySQL-3B4252?logo=mysql&style=flat)
![PostgreSQL Badge](https://img.shields.io/badge/-PostgreSQL-3B4252?logo=postgresql&style=flat)

###### Development Tools, Operating Systems, IDEs
![VSCode Badge](https://img.shields.io/badge/-VSCode-3B4252?style=flat)
![Visual Studio Badge](https://img.shields.io/badge/-Visual%20Studio-3B4252?style=flat)
![Git Badge](https://img.shields.io/badge/-Git-3B4252?logo=git&style=flat)
![Github Badge](https://img.shields.io/badge/-Github-3B4252?logo=github&style=flat)
![Linux Badge](https://img.shields.io/badge/-Linux-3B4252?logo=linux&style=flat)
![Windows Badge](https://img.shields.io/badge/-Windows-3B4252?logo=windows&style=flat)
![Unity Badge](https://img.shields.io/badge/-Unity-3B4252?logo=unity&style=flat)

###### Infrastructure
![Docker Badge](https://img.shields.io/badge/-Docker-3B4252?logo=docker&style=flat)
![Kubernetes Badge](https://img.shields.io/badge/-Kubernetes-3B4252?logo=kubernetes&style=flat)
![Amazon Badge](https://img.shields.io/badge/-Amazon%20AWS-3B4252?logo=amazonwebservices&style=flat)
![Portainer Badge](https://img.shields.io/badge/-Portainer-3B4252?logo=portainer&style=flat)
![Watchtower Badge](https://img.shields.io/badge/-Watchtower-3B4252?logo=watchtower&style=flat)
![CircleCI Badge](https://img.shields.io/badge/-CircleCI-3B4252?logo=circleci&style=flat)
![Terraform Badge](https://img.shields.io/badge/-Terraform-3B4252?logo=terraform&style=flat)
</details>
