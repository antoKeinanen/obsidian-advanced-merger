import { App, Plugin, PluginSettingTab, Setting, TFolder } from "obsidian";

interface AdvancedMergePluginSettings {
	sortAlphabetically: boolean;
}

const DEFAULT_SETTINGS: AdvancedMergePluginSettings = {
	sortAlphabetically: false
}

export default class AdvancedMerge extends Plugin {
	settings: AdvancedMergePluginSettings;

	async onload() {
		await this.loadSettings();

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

								const files = await Promise.all(
									this.settings.sortAlphabetically ?
										vault
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
											})
										: vault
											.getMarkdownFiles()
											.filter(
												(file) =>
													file.parent?.path == folder.path
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

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AdvancedMergeSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class AdvancedMergeSettingTab extends PluginSettingTab {
	plugin: AdvancedMerge;

	constructor(app: App, plugin: AdvancedMerge) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Advanced Merger - Settings'});

		new Setting(containerEl)
			.setName('Sort files alphabetically')
			.setDesc('If enabled, files in slected folder will be sorted alphabetically, according to its full path. Otherwise, files will be sorted by creation date (default behaviour).')
			.addToggle(toggle => toggle
				.setTooltip('Sort files alphabetically')
				.setValue(this.plugin.settings.sortAlphabetically)
				.onChange(async (value) => {
					console.log('sort alphabetically: ' + value);
					this.plugin.settings.sortAlphabetically = value;
					await this.plugin.saveSettings();
				}));
	}
}