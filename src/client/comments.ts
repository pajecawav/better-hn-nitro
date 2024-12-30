export class Comments {
	toggleComment(commentId: number) {
		const comment = this.getComment(commentId);

		if (!comment) {
			return;
		}

		const isFolded = comment.dataset.folded === "true";
		comment.dataset.folded = String(!isFolded);

		comment.querySelector(".info")?.scrollIntoView({ block: "nearest" });
	}

	getComment(commentId: number) {
		return document.getElementById(`comment-${commentId}`);
	}
}
