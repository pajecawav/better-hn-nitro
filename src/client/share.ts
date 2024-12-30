export class Share {
	sharePage() {
		navigator.share({ url: window.location.href });
	}
}
