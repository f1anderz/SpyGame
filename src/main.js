import {createApp} from 'vue'
import App from './components/App.vue'
import components from "@/components";
import store from "@/store/index.js";

const app = createApp(App);

app.use(store);

app.mount('#app');

components.forEach(component => {
    app.component(component.name, component);
});
