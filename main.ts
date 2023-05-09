import { App, Plugin, PluginSettingTab, Setting, TFile, TFolder } from "obsidian";

const TRANSLATIONS: { [name: string]: { [name: string]: string } } = {
	de: {
		MergeFolder: "Ordner zusammenführen",
		MergedFilesuffix: "zusammengeführt",
		Settings: "Einstellungen",
		SettingSortAlphabetically: "Dateien alphabetisch sortieren",
		SettingSortAlphabeticallyDescription: "Wenn aktiviert, werden die Dateien im ausgewählten Ordner alphabetisch nach ihrem vollständigen Pfad sortiert. Andernfalls werden die Dateien nach dem Erstellungsdatum sortiert (Standardverhalten).",
		SettingIncludeNestedFolders: "Verschachtelte Ordner einbeziehen",
		SettingIncludeNestedFoldersDescription: "Wenn aktiviert, werden Dateien in verschachtelten Ordnern zusammengeführt. Andernfalls werden nur Dateien im ausgewählten Ordner zusammengeführt (Standardverhalten)."
	},
	en: {
		MergeFolder: "Merge folder",
		MergedFilesuffix: "merged",
		Settings: "Settings",
		SettingSortAlphabetically: "Sort files alphabetically",
		SettingSortAlphabeticallyDescription: "If enabled, files in selected folder will be sorted alphabetically, according to its full path. Otherwise, files will be sorted by creation date (default behaviour).",
		SettingIncludeNestedFolders: "Include nested folders",
		SettingIncludeNestedFoldersDescription: "If enabled, files in nested folders will be included in merge. Otherwise, only files in selected folder will be merged (default behaviour)."
	},
	fi: {
		MergeFolder: "Yhdistä kansio",
		MergedFilesuffix: "yhdistetty",
		Settings: "Asetukset",
		SettingSortAlphabetically: "Lajittele tiedostot aakkosjärjestykseen",
		SettingSortAlphabeticallyDescription: "Jos tämä on käytössä, valitun kansion tiedostot lajitellaan aakkosjärjestyksessä sen täyden polun mukaan. Muussa tapauksessa tiedostot lajitellaan luomispäivämäärän mukaan (oletuskäyttäytyminen).",
		SettingIncludeNestedFolders: "Sisällytä sisäkkäiset kansiot",
		SettingIncludeNestedFoldersDescription: "Jos tämä on käytössä, sisäkkäisten kansioiden tiedostot sisällytetään yhdistämiseen. Muussa tapauksessa vain valitun kansion tiedostot yhdistetään (oletustoiminto)."
	},
	fr: {
		MergeFolder: "Fusionner le dossier",
		MergedFilesuffix: "fusionné",
		Settings: "Paramètres",
		SettingSortAlphabetically: "Trier les fichiers par ordre alphabétique",
		SettingSortAlphabeticallyDescription: "Si activé, les fichiers du dossier sélectionné seront triés par ordre alphabétique, en fonction de son chemin complet. Sinon, les fichiers seront triés par date de création (comportement par défaut).",
		SettingIncludeNestedFolders: "Inclure les dossiers imbriqués",
		SettingIncludeNestedFoldersDescription: "Si activé, les fichiers des dossiers imbriqués seront inclus dans la fusion. Sinon, seuls les fichiers du dossier sélectionné seront fusionnés (comportement par défaut)."
	},
	ru: {
		MergeFolder: "Объединить папку",
		MergedFilesuffix: "совмещенный",
		Settings: "Настройки",
		SettingSortAlphabetically: "Сортировать файлы по алфавиту",
		SettingSortAlphabeticallyDescription: "Если включено, файлы в выбранной папке будут отсортированы в алфавитном порядке в соответствии с полным путем. В противном случае, файлы будут отсортированы по дате создания (поведение по умолчанию)",
		SettingIncludeNestedFolders: "Влючать вложенные папки",
		SettingIncludeNestedFoldersDescription: "Если включено, файлы во вложенных папках будут включены в слияние. В противном случае будут объединены только файлы в выбранной папке (поведение по умолчанию)."
	},
	ua: {
		MergeFolder: "Об'єднати папку",
		MergedFilesuffix: "об'єднані",
		Settings: "Налаштування",
		SettingSortAlphabetically: "Сортувати файли за алфавітом",
		SettingSortAlphabeticallyDescription: "Якщо ввімкнено, файли у вибраній папці будуть відсортовані в алфавітному порядку відповідно до повного шляху. В іншому випадку файли будуть відсортовані за датою створення (поведінка за замовчуванням).",
		SettingIncludeNestedFolders: "Включити вкладені папки",
		SettingIncludeNestedFoldersDescription: "Якщо ввімкнено, файли у вкладених папках будуть включені в об’єднання. В іншому випадку буде об’єднано лише файли у вибраній папці (поведінка за замовчуванням)."
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

const PLUGIN_NAME = "Advanced Merger";
const DEFAULT_LANGUAGE = "en";
const HANDLER_LOCATION = "file-menu";

export default class AdvancedMerge extends Plugin {
	public language: string;

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

		containerEl.createEl('h2', {text: `${PLUGIN_NAME} - ${TRANSLATIONS[this.plugin.language].Settings}`});

		new Setting(containerEl)
			.setName(TRANSLATIONS[this.plugin.language].SettingSortAlphabetically)
			.setDesc(TRANSLATIONS[this.plugin.language].SettingSortAlphabeticallyDescription)
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.sortAlphabetically)
				.onChange(async (value) => {
					this.plugin.settings.sortAlphabetically = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(TRANSLATIONS[this.plugin.language].SettingIncludeNestedFolders)
			.setDesc(TRANSLATIONS[this.plugin.language].SettingIncludeNestedFoldersDescription)
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.includeNestedFolders)
				.onChange(async (value) => {
					this.plugin.settings.includeNestedFolders = value;
					await this.plugin.saveSettings();
				}));
	}
}
