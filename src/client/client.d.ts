import { Comments } from "./comments";
import { Share } from "./share";
import { UI } from "./ui";

declare global {
	interface Window {
		UI: UI;
		Comments: Comments;
		Share: Share;
	}
}
