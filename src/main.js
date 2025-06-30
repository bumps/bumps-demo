import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../bumps/bumps/webview/client/style.css";
import { io } from "./asyncWorkerSocket";
import { file_menu_items, shared_state } from "bumps-webview-client/src/app_state";
import App from "bumps-webview-client/src/App.vue";
import { panels } from "bumps-webview-client/src/panels";

const urlParams = new URLSearchParams(window.location.search);
const singlePanel = urlParams.get("single_panel");

const socket = io();
const name = "Bumps";

const can_mount_local = ( 'showDirectoryPicker' in window );

async function mountLocal() {
  const success = (await socket.mountLocal?.()) ?? false;
}

createApp(App, { panels, socket, singlePanel, name }).mount("#app");

// const modelNotLoaded = computed(() => shared_state.model_file == null);
// file_menu_items.value.push({
//   text: "Load Data into Model",
//   action: loadProbeFromFile,
//   disabled: modelNotLoaded,
// });
file_menu_items.value.push({
    text: "Mount Local Directory",
    action: mountLocal,
    disabled: !can_mount_local,
    icon: "folder-open",
    tooltip: "Mount a local directory to access files in the Bumps webview",
});