import {
	App,
	Modal,
	Plugin,
	PluginSettingTab,
	Setting,
	TAbstractFile,
	TFile,
	TFolder,
	Vault,
} from "obsidian";

const TRANSLATIONS: { [name: string]: { [name: string]: string } } = {
	de: {
		MergeFolder: "Ordner zusammenführen",
		MergedFilesuffix: "zusammengeführt",
		OverwriteFileQuestion: "Vorhandene Datei überschreiben",
		Settings: "Einstellungen",
		SettingSortAlphabetically: "Dateien alphabetisch sortieren",
		SettingSortAlphabeticallyDescription:
			"Wenn aktiviert, werden die Dateien im ausgewählten Ordner alphabetisch nach ihrem vollständigen Pfad sortiert. Andernfalls werden die Dateien nach dem Erstellungsdatum sortiert (Standardverhalten).",
		SettingIncludeNestedFolders: "Verschachtelte Ordner einbeziehen",
		SettingIncludeNestedFoldersDescription:
			"Wenn aktiviert, werden Dateien in verschachtelten Ordnern zusammengeführt. Andernfalls werden nur Dateien im ausgewählten Ordner zusammengeführt (Standardverhalten).",
		SettingIncludeFoldersAsSections: "Ordner als Abschnitte einbeziehen",
		SettingIncludeFoldersAsSectionsDescription: "Ordner werden als benannte Abschnitte in die Ausgabedatei eingefügt.",
		Yes: "Ja",
		No: "Nein",
	},
	en: {
		MergeFolder: "Merge folder",
		MergedFilesuffix: "merged",
		OverwriteFileQuestion: "Overwite exising file",
		Settings: "Settings",
		SettingSortAlphabetically: "Sort files alphabetically",
		SettingSortAlphabeticallyDescription:
			"If enabled, files in selected folder will be sorted alphabetically, according to its full path. Otherwise, files will be sorted by creation date (default behaviour).",
		SettingIncludeNestedFolders: "Include nested folders",
		SettingIncludeNestedFoldersDescription:
			"If enabled, files in nested folders will be included in merge. Otherwise, only files in selected folder will be merged (default behaviour).",
		SettingIncludeFoldersAsSections: "Include folders as sections",
		SettingIncludeFoldersAsSectionsDescription: "Folders will be included as named sections into output file.",
		Yes: "Yes",
		No: "No",
	},
	fi: {
		MergeFolder: "Yhdistä kansio",
		MergedFilesuffix: "yhdistetty",
		OverwriteFileQuestion: "Korvaa olemassa oleva tiedosto",
		Settings: "Asetukset",
		SettingSortAlphabetically: "Lajittele tiedostot aakkosjärjestykseen",
		SettingSortAlphabeticallyDescription:
			"Jos käytössä, valitun kansion tiedostot lajitellaan aakkosjärjestyksessä sen täyden polun mukaan. Muussa tapauksessa tiedostot lajitellaan luomispäivämäärän mukaan (oletuskäyttäytyminen).",
		SettingIncludeNestedFolders: "Sisällytä sisäkkäiset kansiot",
		SettingIncludeNestedFoldersDescription:
			"Jos käytössä, sisäkkäisten kansioiden tiedostot yhdistetään. Muussa tapauksessa vain valitun kansion tiedostot yhdistetään (oletustoiminto).",
		SettingIncludeFoldersAsSections: "Sisällytä kansiot osioihin",
		SettingIncludeFoldersAsSectionsDescription: "Kansiot sisällytetään nimettyinä osina tulostiedostoon.",
		Yes: "Kyllä",
		No: "Ei",
	},
	fr: {
		MergeFolder: "Fusionner le dossier",
		MergedFilesuffix: "fusionné",
		OverwriteFileQuestion: "Remplacer le fichier existant",
		Settings: "Paramètres",
		SettingSortAlphabetically: "Trier les fichiers par ordre alphabétique",
		SettingSortAlphabeticallyDescription:
			"Si activé, les fichiers du dossier sélectionné seront triés par ordre alphabétique, en fonction de son chemin complet. Sinon, les fichiers seront triés par date de création (comportement par défaut).",
		SettingIncludeNestedFolders: "Inclure les dossiers imbriqués",
		SettingIncludeNestedFoldersDescription:
			"Si activé, les fichiers des dossiers imbriqués seront inclus dans la fusion. Sinon, seuls les fichiers du dossier sélectionné seront fusionnés (comportement par défaut).",
		SettingIncludeFoldersAsSections: "Inclure les dossiers en tant que sections",
		SettingIncludeFoldersAsSectionsDescription: "Les dossiers seront inclus en tant que sections nommées dans le fichier de sortie.",
		Yes: "Oui",
		No: "Non",
	},
	ru: {
		MergeFolder: "Объединить папку",
		MergedFilesuffix: "совмещенный",
		OverwriteFileQuestion: "Перезаписать существующий файл",
		Settings: "Настройки",
		SettingSortAlphabetically: "Сортировать файлы по алфавиту",
		SettingSortAlphabeticallyDescription:
			"Если включено, файлы в выбранной папке будут отсортированы в алфавитном порядке в соответствии с полным путём. В противном случае, файлы будут отсортированы по дате создания (поведение по умолчанию).",
		SettingIncludeNestedFolders: "Влючать вложенные папки",
		SettingIncludeNestedFoldersDescription:
			"Если включено, файлы во вложенных папках будут включены в слияние. В противном случае будут объединены только файлы в выбранной папке (поведение по умолчанию).",
		SettingIncludeFoldersAsSections: "Включать папки как разделы",
		SettingIncludeFoldersAsSectionsDescription: "Папки будут включены в выходной файл в качестве разделов.",
		Yes: "Да",
		No: "Нет",
	},
	ua: {
		MergeFolder: "Об'єднати папку",
		MergedFilesuffix: "об'єднані",
		OverwriteFileQuestion: "Перезаписати існуючий файл",
		Settings: "Налаштування",
		SettingSortAlphabetically: "Сортувати файли за алфавітом",
		SettingSortAlphabeticallyDescription:
			"Якщо ввімкнено, файли у вибраній папці будуть відсортовані в алфавітному порядку відповідно до повного шляху. В іншому випадку файли будуть відсортовані за датою створення (поведінка за замовчуванням).",
		SettingIncludeNestedFolders: "Включити вкладені папки",
		SettingIncludeNestedFoldersDescription:
			"Якщо ввімкнено, файли у вкладених папках будуть включені в об’єднання. В іншому випадку буде об’єднано лише файли у вибраній папці (поведінка за замовчуванням).",
		SettingIncludeFoldersAsSections: "Включити папки як розділи",
		SettingIncludeFoldersAsSectionsDescription: "Папки будуть включені як іменовані розділи у вихідний файл.",
		Yes: "Так",
		No: "Ні",
	},
};

interface AdvancedMergePluginSettings {
	sortAlphabetically: boolean;
	includeNestedFolders: boolean;
	includeFoldersAsSections: boolean;
}

const DEFAULT_SETTINGS: AdvancedMergePluginSettings = {
	sortAlphabetically: false,
	includeNestedFolders: false,
	includeFoldersAsSections: false,
};

/** @constant
    @type {string}
    @default
*/
const ICON_NAME = "git-merge";
/** @constant
    @type {string}
    @default
*/
const PLUGIN_NAME = "Advanced Merger";
/** @constant
    @type {string}
    @default
*/
const DEFAULT_LANGUAGE = "en";
/** @constant
    @type {string}
    @default
*/
const HANDLER_LOCATION = "file-menu";
/** @constant
    @type {string}
    @default
*/
const NEW_LINE_CHAR = "\n";
/** @constant
    @type {string}
    @default
*/
const DOUBLE_NEW_LINE_CHAR = "\n\n";
/** @constant
    @type {string}
    @default
*/
const SECTION_CHAR = "#";
/** @constant
    @type {string}
    @default
*/
const MARKDOWN_FILE_EXTENSION = "md";

export default class AdvancedMerge extends Plugin {
	public language: string;

	public settings: AdvancedMergePluginSettings;

	public async onload(): Promise<void> {
		this.language = !Object.keys(TRANSLATIONS).contains(navigator.language)
			? DEFAULT_LANGUAGE
			: navigator.language;

		await this.loadSettings();

		this.registerEvent(
			this.app.workspace.on(HANDLER_LOCATION, (menu, file) => {
				if (!(file instanceof TFolder)) {
					return;
				}

				const folder = file;
				menu.addItem((item) => {
					item.setTitle(TRANSLATIONS[this.language].MergeFolder)
						.setIcon(ICON_NAME)
						.onClick(
							async (evt) =>
								await this.onClickCallback(folder, evt)
						);
				});
			})
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AdvancedMergeSettingTab(this.app, this));
	}

	private async onClickCallback(
		folder: TFolder,
		_evt: MouseEvent | KeyboardEvent
	): Promise<void> {
		const { vault } = this.app;

		const documentEntries: Array<TAbstractFile> = [];
		Vault.recurseChildren(folder, (folderOrFile: TAbstractFile) =>
		{
			// For merging we are including only *.md files
			if (folderOrFile instanceof TFile && folderOrFile.extension == MARKDOWN_FILE_EXTENSION) {
				console.log(`Found a file: ${folderOrFile.name}`);
				documentEntries.push(folderOrFile);
			} else if (folderOrFile instanceof TFolder && this.settings.includeFoldersAsSections) {
				console.log(`Found a folder: ${folderOrFile.name}`);
				documentEntries.push(folderOrFile);
			}
		});

		const entries = this.sortNotes(
			documentEntries
				.filter((entry) => this.filterNotes(folder, entry))
		);

		const outputFileName = `${folder.path}-${
			TRANSLATIONS[this.language].MergedFilesuffix
		}.md`;
		const fileExists = await vault.adapter.exists(outputFileName, false);
		if (fileExists) {
			new AdvancedMergeOverwriteFileModal(
				this.app,
				this.language,
				outputFileName,
				async (deleteFile) => {
					if (!deleteFile) {
						console.info(
							`file "${outputFileName}" already exists, but user cancelled deleting..`
						);
						return;
					}

					console.info(
						`file "${outputFileName}" already exists, deleting..`
					);
					await vault.adapter.remove(outputFileName);

					await this.mergeNotes(vault, entries, outputFileName);
				}
			).open();
			return;
		}
		await this.mergeNotes(vault, entries, outputFileName);
	}

	/**
	 * Merges input notes to single output file.
	 * @param {Vault} vault - Current vault.
	 * @param {Array<TAbstractFile>} entries - Files and folders, to be included.
	 * @param {string} outputFileName - Output file name.
	 */
	private async mergeNotes(
		vault: Vault,
		entries: Array<TAbstractFile>,
		outputFileName: string
	): Promise<void> {
		const outputFile = await vault.create(outputFileName, "");

		for (let index = 0; index < entries.length; index++) {
			const folderOrFile: TAbstractFile = entries[index];
			const sectionLevel = (folderOrFile.path.match(/\//g)||[]).length;

			let sectionContents = `${ index === 0 ? "" : NEW_LINE_CHAR }`;
			const lastEntry = index === entries.length - 1;

			if (folderOrFile instanceof TFile) {
				sectionContents += await vault.cachedRead(folderOrFile);
				const fileSectionName = folderOrFile.name.replace(/\.md$/, "");
				// For the first file in a row, we shouldnt add new line
				sectionContents = `${SECTION_CHAR.repeat(sectionLevel)} ${fileSectionName}${DOUBLE_NEW_LINE_CHAR}${sectionContents}${lastEntry ? "" : DOUBLE_NEW_LINE_CHAR}`;
				console.info(
					`Adding file "${folderOrFile.name}" as section "${fileSectionName}" into file "${outputFileName}"..`
				);

			} else if (folderOrFile instanceof TFolder) {
				sectionContents += `${SECTION_CHAR.repeat(sectionLevel)} ${folderOrFile.name}${DOUBLE_NEW_LINE_CHAR}`;
				console.info(
					`Adding folder "${folderOrFile.name}" as section "${sectionContents}" into file "${outputFileName}"..`
				);
			}
			vault.append(outputFile, sectionContents);
		}
	}

	/**
	 * Applies filtering to input file.
	 * @param {TFolder} folder - Selected folder.
	 * @param {TFile} file - Files, to be included.
	 * @returns {boolean} Provided file passses folder check.
	 */
	private filterNotes(folder: TFolder, file: TAbstractFile): boolean {
		return this.settings.includeNestedFolders
			? !!file.parent?.path.startsWith(folder.path)
			: file.parent?.path == folder.path;
	}

	/**
	 * Applies sorting to input files array.
	 * @param {Array<TFile>} files - The files array, to be sorted.
	 * @returns {Array<TFile>} Sorted files array.
	 */
	private sortNotes(files: Array<TAbstractFile>): Array<TAbstractFile> {
		return this.settings.sortAlphabetically
			? files.sort((a, b) => {
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

	/**
	 * De-serializes settings from persistent storage.
	 */
	private async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	/**
	 * Serializes settings into persistent storage.
	 */
	public async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}

class AdvancedMergeSettingTab extends PluginSettingTab {
	private plugin: AdvancedMerge;

	/**
	 * Represents a settings tab.
	 * @constructor
	 * @param {App} app - The `Obsidian` application object.
	 * @param {AdvancedMerge} plugin - The `AdvancedMerge` plugin object.
	 */
	constructor(app: App, plugin: AdvancedMerge) {
		super(app, plugin);
		this.plugin = plugin;
	}

	public display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", {
			text: `${PLUGIN_NAME} - ${
				TRANSLATIONS[this.plugin.language].Settings
			}`,
		});

		// Add "sort alphabetically" toggle in settings
		new Setting(containerEl)
			.setName(
				TRANSLATIONS[this.plugin.language].SettingSortAlphabetically
			)
			.setDesc(
				TRANSLATIONS[this.plugin.language]
					.SettingSortAlphabeticallyDescription
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.sortAlphabetically)
					.onChange(async (value) => {
						this.plugin.settings.sortAlphabetically = value;
						await this.plugin.saveSettings();
					})
			);

		// Add "include nested folders" toggle in settings
		new Setting(containerEl)
			.setName(
				TRANSLATIONS[this.plugin.language].SettingIncludeNestedFolders
			)
			.setDesc(
				TRANSLATIONS[this.plugin.language]
					.SettingIncludeNestedFoldersDescription
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.includeNestedFolders)
					.onChange(async (value) => {
						this.plugin.settings.includeNestedFolders = value;
						await this.plugin.saveSettings();
					})
			);

		// Add "include folders as sections" toggle in settings
		new Setting(containerEl)
			.setName(
				TRANSLATIONS[this.plugin.language].SettingIncludeFoldersAsSections
			)
			.setDesc(
				TRANSLATIONS[this.plugin.language]
					.SettingIncludeFoldersAsSectionsDescription
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.includeFoldersAsSections)
					.onChange(async (value) => {
						this.plugin.settings.includeFoldersAsSections = value;
						await this.plugin.saveSettings();
					})
			);
	}
}

class AdvancedMergeOverwriteFileModal extends Modal {
	private language: string;
	private existingFileName: string;
	private onSubmitHandler: (result: boolean) => void;

	/**
	 * Represents an "Overwrite file?" dialog.
	 * @constructor
	 * @param {App} app - The `Obsidian` application object.
	 * @param {string} language - Application language.
	 * @param {string} existingFileName - Existing file name.
	 * @param handler - Modal callback handler.
	 */
	constructor(
		app: App,
		language: string,
		existingFileName: string,
		handler: (result: boolean) => void
	) {
		super(app);
		this.language = language;
		this.existingFileName = existingFileName;
		this.onSubmitHandler = handler;
	}

	public onOpen() {
		const { contentEl } = this;

		contentEl.createEl("h3", {
			text: `${TRANSLATIONS[this.language].OverwriteFileQuestion} "${
				this.existingFileName
			}"?`,
		});

		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText(TRANSLATIONS[this.language].No)
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmitHandler(false);
					})
			)
			.addButton((btn) =>
				btn
					.setButtonText(TRANSLATIONS[this.language].Yes)
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmitHandler(true);
					})
			);
	}

	public onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
