import { createApp } from "vue";
import App from "./App.vue";
import routes from "./routes";
import "@/assets/scss/styles.scss";
import timeago from "vue-timeago3";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(timeago)
    .use(moment)
    .use(routes)
    .use(VueSweetalert2)
    .mount("#app");
