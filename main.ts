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

// Remember to rename these classes and interfaces!

interface MyPluginSettings {}

const DEFAULT_SETTINGS: MyPluginSettings = {};

export default class makerPlugin extends Plugin {
	async onload() {
		this.addRibbonIcon("eye", "Peek into the dark", () => {
			new Notice("Woo!");
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
			editorCallback: (editor,view) => {
				const value = editor.getValue().replace(/^\#(.*)$/gm,(match)=>match+"🎃");
				editor.setValue(value);
				console.log(value);
			},
		});
	}

	onunload() {}
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
