const MOUSE_OVER_TIMEOUT_MS = 80;

const prefetch = (el: HTMLAnchorElement) => {
	const href = el.href;

	if (href) {
		const link = document.createElement("link");
		link.href = href;
		link.rel = "prefetch";
		document.head.appendChild(link);
	}

	delete el.dataset.prefetch;
};

document.querySelectorAll<HTMLAnchorElement>("[data-prefetch]").forEach(el => {
	let timeoutId: number | undefined = undefined;

	const onMouseEnter = (event: MouseEvent) => {
		if (event.relatedTarget) {
			timeoutId = window.setTimeout(handle, MOUSE_OVER_TIMEOUT_MS);
		}
	};

	const onMouseLeave = () => {
		clearTimeout(timeoutId);
	};

	const handle = () => {
		prefetch(el);

		el.removeEventListener("mouseenter", onMouseEnter);
		el.removeEventListener("mouseleave", onMouseLeave);
	};

	el.addEventListener("mouseenter", onMouseEnter);
	el.addEventListener("mouseleave", onMouseLeave);
});
