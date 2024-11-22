const { createApp } = Vue

let app;
fetch('./data.yaml')
    .then((res) => res.text())
    .then((yaml) => {
        data = jsyaml.load(yaml)
        app = createApp({
            data: () => { return { data } }
        }).mount("#app");
    })
