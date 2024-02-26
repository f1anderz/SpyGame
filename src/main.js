import {createApp} from 'vue'
import App from './App.vue'
import components from "@/components";

const app = createApp(App);

app.mount('#app');

components.forEach(component => {
    app.component(component.name, component);
});
