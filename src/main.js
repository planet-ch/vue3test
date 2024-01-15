import { createApp } from "vue";
import App from "./App.vue";
import store from './store'
import router from './router'

// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

import "~/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
app.use(store)
app.use(router)
// app.use(ElementPlus);
app.mount("#app");