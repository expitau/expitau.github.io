# About me
## Hello!


My name is Nathan, I'm a highly motivated software developer with several years of professional experience and a proven ability to write high-quality maintainable code when I can, and fast solution-oriented programs when I must.

I am currently in my 4A term of studying Computational Mathematics at the University of Waterloo. When I'm not contributing to open source or tinkering with hardware, I spend time working on my many personal projects, some of which you can find on <a href="https://github.com/expitau">my GitHub</a>

## Technologies

I've worked with dozens of different technologies, and I'm always keen to pick up more. This is not an exhaustive list, in no particular order. 

## Tech Stack
### Software
<p>
    <strong
        >OS | <a href="https://fedoraproject.org/">Fedora Linux</a
        ></strong
    > -- This is an amazing operating system, it's stable, responsive, and
    I like GNOME (for now...). My dream is to switch to <a
        href="https://fedoraproject.org/silverblue/"
        >Fedora Silverblue</a
    > one day, building my desktop as an OCI container in the cloud and pulling
    in updates immutably. However, container diffs are a blocker for this
    at the moment (See <a
        href="https://github.com/containers/image/pull/902">#902</a
    >).
</p>
<p>
    <strong
        >IDE | <a href="https://code.visualstudio.com/">VSCode</a
        ></strong
    > -- VSCode is an amazing editor, and while I've found it to be a bit
    slow (for a text editor haha), I love the seamless remote development
    integration, which is a dealbreaker for me in any other editor.
</p>
<p>
    <strong>Subsystem | <a href="https://docker.com/">Docker</a></strong
    > -- When switching to Linux from Windows, I missed WSL2. The ability
    to have a work environment where I could install programs freely without
    working about breaking my system was great. Fortunately, I was able to
    recreate this (and more!) with pure Docker containers. They integrate
    seamlessly with VSCode, and allowed me to develop with Ubuntu for my
    previous job (so people couldn't blame me for using a different environment
    when things broke) and Arch for my personal projects (so I get the most
    up-to-date software without resorting to manually adding repos).
</p>
<p>
    <strong
        >Shell prompt | <a href="https://github.com/petobens/trueline"
            >Trueline</a
        ></strong
    > -- I wanted to like <a href="https://starship.rs/">starship.rs</a
    >, I wanted to like <a
        href="https://github.com/romkatv/powerlevel10k">powerlevel10k</a
    >, but the config and installation was too annoying to maintain
    across different environments. Trueline works exactly how I want it
    to (almost) out of the box, and I can copy a single bash file around
    to get the prompt anywhere.
    <br /><br />
    I also add the following to my <code>.bashrc</code> for a better experience
    across different terminal emulators
</p>
<pre
    style="background-color:#24292e;color:#e1e4e8; overflow-x: auto; padding: 1rem; border-radius: 0.5rem;"
    tabindex="0"><code><span class="line"><span style="color:#B392F0">setopt</span><span style="color:#9ECBFF"> menu_complete</span><span style="color:#6A737D"> # Tab autocomplete</span></span>
<span class="line"><span style="color:#79B8FF">unsetopt</span><span style="color:#9ECBFF"> auto_list</span><span style="color:#6A737D"> # Don't list options on tab</span></span>
<span class="line" />
<span class="line"><span style="color:#79B8FF">bindkey</span><span style="color:#9ECBFF">  "^[[H"</span><span style="color:#9ECBFF">   beginning-of-line</span><span style="color:#6A737D"> # Home key</span></span>
<span class="line"><span style="color:#79B8FF">bindkey</span><span style="color:#9ECBFF">  "^[[F"</span><span style="color:#9ECBFF">   end-of-line</span><span style="color:#6A737D"> # End key</span></span>
<span class="line"><span style="color:#79B8FF">bindkey</span><span style="color:#9ECBFF">  "^[[3~"</span><span style="color:#9ECBFF">  delete-char</span><span style="color:#6A737D"> # Delete key</span></span></code></pre>
        <br />
        <h3 id="extensions">Gnome extensions</h3>
        <ul>
            <li><strong>Blur my shell</strong> -- pretty!</li>
            <li>
                <strong>Tiling Assistant</strong> -- quarter tiling so good you'd
                think it was built-in
            </li>
            <li>
                <strong>Caffeine</strong> -- I use it more than I thought I would
            </li>
            <li>
                <strong>Clipboard Indicator</strong> -- not perfect, I wish there
                was something closer to Windows' clipboard history. Maybe I'll write
                my own!
            </li>
            <li>
                <strong>Color Picker</strong> -- great, works identical to the
                <a
                    href="https://learn.microsoft.com/en-us/windows/powertoys/color-picker"
                    >Powertoy on Windows</a
                >
            </li>
            <li>
                <s><strong>Dash to Panel</strong></s> -- if you're coming from Windows
                and want this, it's amazing. I prefer stock GNOME though
            </li>
            <li>
                <strong>GSConnect</strong> -- meh. It works, but isn't super useful
            </li>
            <li><strong>Just Perfection</strong> -- a few UI tweaks</li>
        </ul>

        <!-- Photo of laptop -->
        <img
            src="/laptop-on-desk.jpg"
            style="margin-top: 2rem"
            alt="Laptop on desk"
        />
        <p style="width: 100%; text-align: center">Photo credit: Phil Barker</p>
        <h3 id="hardware">Hardware</h3>
        <p>
            <strong>Laptop | Dell XPS 17 9720</strong> -- This is current daily driver.
            It's performance has been more than sufficient for my use, and I've encountered
            none of the heating issues that I had with my previous (Lenovo T490)
            laptop. It looks amazing, and the keyboard and trackpad feel great. However,
            the webcam leaves some to be desired, and I miss my ethernet / HDMI /
            USB-A ports. When docked at home, I connect it to two external displays
            with a Dell USB hub (unfortunately, Dell's got me locked in to a 130W
            hub), which works great but definitely isn't worth the price.
        </p>
        <p>
            <strong>Displays | Asus VA24E</strong> -- I have two of these monitors,
            and they're great. They're cheap, and the colours are good enough for
            my use. I've set them up with a dual-monitor arm from Amazon, and they
            can comfortably sit in any position. I wish they had displayport, but
            I got the two of them for about $200 so I can't complain.
        </p>
        <p>
            <strong>Mouse | MX Master 3</strong> -- I've been using this mouse for
            a few months now, and I love it. The scroll wheel is amazing, and it's
            super comfortable. While pricey, I don't regret the investment.
        </p>
        <p>
            <strong>Phone | Pixel 4a</strong> -- This phone works great, I love the
            fingerprint sensor placement, and the camera is more than enough for
            me. It's been going strong for about 2-3 years now, and I'm going to
            hold onto it as long as I can
        </p>
        <p>
            <strong>Earbuds | Jabra Elite 4</strong> -- My first earbuds, that I
            use on occasion. They're cheap, sound great, and are reasonably comfortable
            (though I haven't used many other earbuds).
        </p>
