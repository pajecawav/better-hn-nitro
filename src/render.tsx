import { EventHandlerRequest, H3Event } from "h3";
import { Child } from "hono/jsx";
import { renderToReadableStream } from "hono/jsx/dom/server";
import { ServerTiming } from "tiny-server-timing";
import { getAssets } from "./assets";
import { App } from "./components/App";
import { SSRContext, SSRContextValue } from "./lib/context";
import { DEFAULT_THEME, Theme, THEME_COOKIE } from "./lib/theme";

interface RenderPageOptions {
	title?: string;
	timing: ServerTiming;
	event: H3Event<EventHandlerRequest>;
}

export const renderPage = async (page: Child, { title, event }: RenderPageOptions) => {
	// timing.start("render");

	setResponseHeader(event, "content-type", "text/html; charset=utf-8");

	const assets = await getAssets();

	const theme = (getCookie(event, THEME_COOKIE) ?? DEFAULT_THEME) as Theme;

	// TODO: 103 early hints

	const context: SSRContextValue = {
		url: getRequestURL(event),
		title,
		assets,
		theme,
	};

	// timing.end("render");

	// TODO: figure out how to send server-timing
	// setHeaders(event, timing.getHeaders());

	setHeader(event, "Content-Type", "text/html, charset=UTF-8");

	event.node.res.write("<!DOCTYPE html>");

	return renderToReadableStream(
		<SSRContext.Provider value={context}>
			<App>{page}</App>
		</SSRContext.Provider>,
	);
};
