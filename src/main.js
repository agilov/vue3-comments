import {createApp} from "vue";

import store from './store'
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/style.css";

const app = createApp(App)
app.use(store)
app.mount('#app')
