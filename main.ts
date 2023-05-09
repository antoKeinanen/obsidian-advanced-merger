import { App, Plugin, PluginSettingTab, Setting, TFile, TFolder } from "obsidian";

const TRANSLATIONS: { [name: string]: { [name: string]: string } } = {
	de: {
		MergeFolder: "Ordner zusammenführen",
		MergedFilesuffix: "zusammengeführt"
	},
	en: {
		MergeFolder: "Merge folder",
		MergedFilesuffix: "merged"
	},
	fi: {
		MergeFolder: "Yhdistä kansio",
		MergedFilesuffix: "yhdistetty"
	},
	fr: {
		MergeFolder: "Fusionner le dossier",
		MergedFilesuffix: "fusionné"
	},
	ru: {
		MergeFolder: "Объединить папку",
		MergedFilesuffix: "совмещенный"
	},
	ua: {
		MergeFolder: "Об'єднати папку",
		MergedFilesuffix: "об'єднані"
	}
}

interface AdvancedMergePluginSettings {
	sortAlphabetically: boolean;
	includeNestedFolders: boolean
}

const DEFAULT_SETTINGS: AdvancedMergePluginSettings = {
	sortAlphabetically: false,
	includeNestedFolders: false
}

const DEFAULT_LANGUAGE = "en";
const HANDLER_LOCATION = "file-menu";

export default class AdvancedMerge extends Plugin {
	private language: string;

	public settings: AdvancedMergePluginSettings;

	public async onload(): Promise<void> {
		this.language = TRANSLATIONS[navigator.language] === null ? DEFAULT_LANGUAGE : navigator.language;

		await this.loadSettings();

		this.registerEvent(
			this.app.workspace.on(HANDLER_LOCATION, (menu, file) => {
				if (!(file instanceof TFolder)) {
					return;
				}

				const folder = file;
				menu.addItem((item) => {
					item.setTitle(TRANSLATIONS[this.language].MergeFolder)
						.setIcon("git-merge")
						.onClick(async(evt) => await this.onClickCallback(folder, evt));
				});
			})
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AdvancedMergeSettingTab(this.app, this));
	}

	private async onClickCallback(folder: TFolder, _evt: MouseEvent | KeyboardEvent): Promise<void> {
		const { vault } = this.app;

		const files = this.fileSort(
			vault
				.getMarkdownFiles()
				.filter((file) => this.fileFilter(folder, file)));

		const destination = await vault.create(
			`${folder.path}-${TRANSLATIONS[this.language].MergedFilesuffix}.md`,
			""
		);

		files.forEach(async (file) => {
			let contents = await vault.read(file);
			contents = `\n# ${file.name.replace(
				/\.md$/,
				""
			)}\n${contents}\n`;
			vault.append(destination, contents);
		});
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
