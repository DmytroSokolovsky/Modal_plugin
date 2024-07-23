let noop = () => {};

function _createModalFooter(buttons = []) {
	if (buttons.length === 0) {
		return document.createElement("div");
	}

	const footer = document.createElement("div");
	footer.classList.add("modal__footer");

	buttons.forEach((button) => {
		const $btn = document.createElement("button");
		$btn.textContent = button.text;
		$btn.classList.add("btn");
		$btn.classList.add(`btn_${button.type || "secondary"}`);

		$btn.addEventListener("click", (e) => {
			if (button.handler) {
				button.handler();
			} else {
				noop;
			}
		});

		footer.append($btn);
	});

	return footer;
}

function _createModal(options) {
	const DEFAULT_WIDTH = "600px";
	const modal = document.createElement("div");
	modal.classList.add("modal");

	modal.insertAdjacentHTML(
		"afterbegin",
		`
      <div class="modal__overlay" data-close="true">
         <div class="modal__window" style="width: ${
				options.width || DEFAULT_WIDTH
			}">
            <div class="modal__header">
               <span class="modal__title">${
						options.title ? options.title : "Default title"
					}</span>
               ${
						options.closable
							? `
							<span class="modal__close" data-close="true">&times;</span>
						`
							: ""
					}
            </div>
            <div class="modal__body" data-content>
               ${
						options.content
							? options.content
							: "Lorem ipsum dolor sit amet"
					}
            </div>
         </div>
      </div>
   `
	);

	const footer = _createModalFooter(options.footerButtons);
	const modal__body = modal.querySelector("[data-content]");
	modal__body.after(footer);
	document.body.append(modal);
	return modal;
}

$.modal = function (options) {
	const ANIMATION__SPEED = 200;
	const $modal = _createModal(options);
	let closing = false;
	let destroyed = false;

	const modal = {
		open() {
			if (destroyed) {
				return console.log("Modal is destroyed");
			}
			!closing && $modal.classList.add("open");
		},
		close() {
			closing = true;
			$modal.classList.remove("open");
			$modal.classList.add("hide");
			setTimeout(() => {
				$modal.classList.remove("hide");
				closing = false;
				if (typeof options.onClose === "function") {
					options.onClose();
				}
			}, ANIMATION__SPEED);
		},
	};

	const listener = (e) => {
		if (e.target.dataset.close) {
			modal.close();
		}
	};

	$modal.addEventListener("click", listener);

	return Object.assign(modal, {
		destroy() {
			$modal.parentNode.removeChild($modal);
			$modal.removeEventListener("click", listener);
			destroyed = true;
		},
		setContent(content) {
			$modal.querySelector("[data-content]").innerHTML = content;
		},
	});
};
