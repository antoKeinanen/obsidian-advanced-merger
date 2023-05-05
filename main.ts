import { Plugin, TFolder } from "obsidian";

export default class AdvancedMerge extends Plugin {
	onload() {
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				if (file instanceof TFolder) {
					const folder = file;
					menu.addItem((item) => {
						item.setTitle("Merge folder")
							.setIcon("git-merge")
							.onClick(async () => {
								const { vault } = this.app;

								const destination = await vault.create(
									`${folder.path}-merged.md`,
									""
								);

								const files = vault
									.getMarkdownFiles()
									.filter(
										(file) =>
											file.parent?.path == folder.path
									)
									.sort((a, b) => {
										const x = a.path.toLowerCase();
										const y = b.path.toLowerCase();
										if (x < y) {
											return -1;
										}
										if (x > y) {
											return 1;
										}
										return 0;
									});

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
}
