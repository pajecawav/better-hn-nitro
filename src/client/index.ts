import { registerSW } from "virtual:pwa-register";
import { Comments } from "./comments";
import { Share } from "./share";
import { UI } from "./ui";
import "./styles/index.css";

registerSW();

window.UI = new UI();
window.Comments = new Comments();
window.Share = new Share();

window.addEventListener("pageshow", () => {
	window.UI.updateTheme();
});
