import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import 'boxicons'

const app = createApp(App)

const components = import.meta.glob('./components/**/*.vue');
Object.entries(components).forEach(async ([path, loader]) => {
    const component = await loader();
    const componentName = path.split('/').pop().replace(/\.\w+$/, '');
    app.component(componentName.replace('Component', ''), component.default);
});

app.use(router)

app.mount('#app')
