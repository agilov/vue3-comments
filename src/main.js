import {createApp} from "vue";

import store from './store'
import ChatApp from "./ChatApp.vue";
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/style.css";

const app = createApp(ChatApp)
app.use(store)
app.mount('#app')