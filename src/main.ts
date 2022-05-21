import { createApp } from "vue";
import { createPinia } from "pinia";
import _ from "lodash";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
_.forEach(ElementPlusIconsVue, (component, key) => {
	app.component(key, component);
});

app.mount("#app");
