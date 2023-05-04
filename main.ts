import { App, Plugin, PluginSettingTab, Setting, TFile, TFolder } from "obsidian";

interface AdvancedMergePluginSettings {
	sortAlphabetically: boolean;
	includeNestedFolders: boolean
}

const DEFAULT_SETTINGS: AdvancedMergePluginSettings = {
	sortAlphabetically: false,
	includeNestedFolders: false
}

export default class AdvancedMerge extends Plugin {
	public settings: AdvancedMergePluginSettings;

	public async onload(): Promise<void> {
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
									this.fileSort(
										vault
											.getMarkdownFiles()
											.filter((file) => this.fileFilter(folder, file)))
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

	private fileFilter(folder: TFolder, file: TFile): boolean {
		return this.settings.includeNestedFolders ?
			!!file.parent?.path.startsWith(folder.path)
			: file.parent?.path == folder.path;
	}

	private fileSort(files: Array<TFile>): Array<TFile> {
		return this.settings.sortAlphabetically ?
			files.sort((a, b) => {
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
			: files.reverse();
	}

	private async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	public async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}

class AdvancedMergeSettingTab extends PluginSettingTab {
	private plugin: AdvancedMerge;

	constructor(app: App, plugin: AdvancedMerge) {
		super(app, plugin);
		this.plugin = plugin;
	}

	public display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Advanced Merger - Settings'});

		new Setting(containerEl)
			.setName('Sort files alphabetically')
			.setDesc('If enabled, files in selected folder will be sorted alphabetically, according to its full path. Otherwise, files will be sorted by creation date (default behaviour).')
			.addToggle(toggle => toggle
				.setTooltip('Sort files alphabetically')
				.setValue(this.plugin.settings.sortAlphabetically)
				.onChange(async (value) => {
					console.log('sort alphabetically: ' + value);
					this.plugin.settings.sortAlphabetically = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Include files in nested folders')
			.setDesc('If enabled, files in nested folders will be included in merge. Otherwise, only files in selected folder will be merged (default behaviour).')
			.addToggle(toggle => toggle
				.setTooltip('Merge files in nested folders')
				.setValue(this.plugin.settings.includeNestedFolders)
				.onChange(async (value) => {
					console.log('includeNestedFolders: ' + value);
					this.plugin.settings.includeNestedFolders = value;
					await this.plugin.saveSettings();
				}));
	}
}