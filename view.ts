import { ItemView, Notice, Setting } from "obsidian";

export const MAKER_VIEW_TYPE = "maker-view";

export class makerView extends ItemView{
    getViewType(): string {
        return MAKER_VIEW_TYPE;
    }
    getDisplayText(): string {
        return "Emergency contacts";
    }

    async onOpen() {
        this.render();
    }

    render(){
        const { contentEl } = this;
        contentEl.createEl("h1",{text: "Emergency contacts"})

        new Setting(contentEl).setName("1maker").addButton(item=>{
            item.setButtonText("call!");
        });
    }
    async onClose(){
        new Notice("onClose")
    }
}