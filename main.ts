import { Plugin, TFolder } from "obsidian";

export default class AdvancedMerge extends Plugin {
	onload() {
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				const folderOrFile = this.app.vault.getAbstractFileByPath(
					file.path
				);
				if (folderOrFile instanceof TFolder) {
					const folder = file;
					menu.addItem((item) => {
						item.setTitle("Merge folder")
							.setIcon("git-merge")
							.onClick(async () => {
								const { vault } = this.app;

								let destination = await vault.create(
									`${folder.path}-merged.md`,
									""
								);

								const files = await Promise.all(
									vault
										.getMarkdownFiles()
										.filter(
											(file) =>
												file.parent.path == folder.path
										)
										.reverse()
								);

								files.forEach(async (file) => {
									let contents = await vault.read(file);
									contents = `\n# ${file.name.replace(
										/\.md$/,
										""
									)}\n${contents}\n`;
									vault.append(destination, contents);
								});
							});
					});
				}
			})
		);
	}

	onunload() {
		this.app.workspace.off("file-menu", () => {});
	}
}
