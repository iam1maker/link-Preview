import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { previewBarPopover } from "./modals/previewBarModals.ts";
import { MAKER_VIEW_TYPE, makerView } from "view";

// Remember to rename these classes and interfaces!

// interface MyPluginSettings {}

// const DEFAULT_SETTINGS: MyPluginSettings = {};

export default class makerPlugin extends Plugin {
	private hoverTimeout: NodeJS.Timeout | null = null;
	private interval: NodeJS.Timer;
	lastSelection = '';

	async onload() {
		
		this.interval = setInterval(() => {
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);
			const editor = view?.editor;

			if (editor && editor.somethingSelected()) {
				const selection = editor.getSelection();
				// 判断selection是否是链接
				const isLink = this.isLink(selection);

				if (selection !== this.lastSelection) {

					this.lastSelection = selection;

					if (isLink) {
						// 处理链接,比如打开
						new Notice("It's a Web Link!");
						
					}
				}

				
			}
		}, 200);


		


		this.addRibbonIcon("eye", "Peek into the dark", () => {
			new Notice("Woo!");
		});

		this.addRibbonIcon("file", "Emergency Contacts", () => {
			this.openview();
		});

		this.addCommand({
			id: "peek",
			name: "peek into the dark",
			checkCallback: (checking) => {
				const pastDark = new Date().getHours() <= 23;
				if (pastDark) {
					if (!checking) {
						new Notice("It's too late to peek!");
					}
					return true;
				}
				return false;
			},
		});

		this.addCommand({
			id: "decorate",
			name: "Decorate",
			editorCallback: (editor, view) => {
				const value = editor
					.getValue()
					.replace(/^\#(.*)$/gm, (match) => match + "🎃");
				editor.setValue(value);
				console.log(value);
			},
		});

		this.registerView(MAKER_VIEW_TYPE, (leaf) => new makerView(leaf));
	}

	openview() {
		this.app.workspace.detachLeavesOfType(MAKER_VIEW_TYPE);
		const leaf = this.app.workspace.getRightLeaf(false);
		leaf.setViewState({
			type: MAKER_VIEW_TYPE,
		});
		this.app.workspace.revealLeaf(leaf);
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(MAKER_VIEW_TYPE);
		clearInterval(this.interval); 
	}

	isLink(text: string) {
		// 正则表达式判断链接
		const urlRegex =
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
		return urlRegex.test(text);
	}
}

class SampleModal extends Modal {
	// constructor(app: App) {
	// 	super(app);
	// }
	// onOpen() {
	// 	const {contentEl} = this;
	// 	contentEl.setText('Woah!');
	// }
	// onClose() {
	// 	const {contentEl} = this;
	// 	contentEl.empty();
	// }
}

// import { Menu, Notice, Plugin } from "obsidian";

// export default class ExamplePlugin extends Plugin {
//   async onload() {
//     this.addRibbonIcon("dice", "Open menu", (event) => {
//       const menu = new Menu();

//       menu.addItem((item) =>
//         item
//           .setTitle("Copy")
//           .setIcon("documents")
//           .onClick(() => {
//             new Notice("Copied");
//           })
//       );

//       menu.addItem((item) =>
//         item
//           .setTitle("Paste")
//           .setIcon("paste")
//           .onClick(() => {
//             new Notice("Pasted");
//           })
//       );

//       menu.showAtMouseEvent(event);
//     });
//   }
// }
