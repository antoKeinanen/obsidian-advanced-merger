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

interface Translation {
	MergeFolder: string;
	MergedFilesuffix: string;
	OverwriteFileQuestion: string;
	Settings: string;
	SettingSortMode: string;
	SettingSortModeDescription: string;
	SettingSortAlphabetically: string;
	SettingSortDateCreated: string;
	SettingSortLogical: string;
	SettingIncludeNestedFolders: string;
	SettingIncludeNestedFoldersDescription: string;
	SettingIncludeFoldersAsSections: string;
	SettingIncludeFoldersAsSectionsDescription: string;
	Yes: string;
	No: string;
}

const TRANSLATIONS: { [name: string]: Translation } = {
	de: {
		MergeFolder: "Ordner zusammenführen",
		MergedFilesuffix: "zusammengeführt",
		OverwriteFileQuestion: "Vorhandene Datei überschreiben",
		Settings: "Einstellungen",
		SettingIncludeNestedFolders: "Verschachtelte Ordner einbeziehen",
		SettingIncludeNestedFoldersDescription: "Wenn aktiviert, werden Dateien in verschachtelten Ordnern zusammengeführt. Andernfalls werden nur Dateien im ausgewählten Ordner zusammengeführt (Standardverhalten).",
		SettingIncludeFoldersAsSections: "Ordner als Abschnitte einbeziehen",
		SettingIncludeFoldersAsSectionsDescription: "Ordner werden als benannte Abschnitte in die Ausgabedatei eingefügt.",
		Yes: "Ja",
		No: "Nein",
		SettingSortMode: "Sortiermodus",
		SettingSortModeDescription: "Wählen Sie den Sortiermodus für das Zusammenführen von Notizen.",
		SettingSortDateCreated: "Erstellungsdatum",
		SettingSortLogical: "Logisch",
		SettingSortAlphabetically: "Alphabetisch"
	},
	en: {
		MergeFolder: "Merge folder",
		MergedFilesuffix: "merged",
		OverwriteFileQuestion: "Overwite exising file",
		Settings: "Settings",
		SettingIncludeNestedFolders: "Include nested folders",
		SettingIncludeNestedFoldersDescription: "If enabled, files in nested folders will be included in merge. Otherwise, only files in selected folder will be merged (default behaviour).",
		SettingIncludeFoldersAsSections: "Include folders as sections",
		SettingIncludeFoldersAsSectionsDescription: "Folders will be included as named sections into output file.",
		Yes: "Yes",
		No: "No",
		SettingSortMode: "Sort mode",
		SettingSortModeDescription: "Pick the sorting mode for merging notes.",
		SettingSortDateCreated: "Date created",
		SettingSortLogical: "Logical",
		SettingSortAlphabetically: "Alphabetical"
	},
	fi: {
		MergeFolder: "Yhdistä kansio",
		MergedFilesuffix: "yhdistetty",
		OverwriteFileQuestion: "Korvaa olemassa oleva tiedosto",
		Settings: "Asetukset",
		SettingIncludeNestedFolders: "Sisällytä sisäkkäiset kansiot",
		SettingIncludeNestedFoldersDescription: "Jos käytössä, sisäkkäisten kansioiden tiedostot yhdistetään. Muussa tapauksessa vain valitun kansion tiedostot yhdistetään (oletustoiminto).",
		SettingIncludeFoldersAsSections: "Sisällytä kansiot osioihin",
		SettingIncludeFoldersAsSectionsDescription: "Kansiot sisällytetään nimettyinä osina tulostiedostoon.",
		Yes: "Kyllä",
		No: "Ei",
		SettingSortMode: "Lajittelu järjestys",
		SettingSortModeDescription: "Valitse lajittelutapa muistiinpanojen yhdistämistä varten.",
		SettingSortDateCreated: "Luontipäivämäärä",
		SettingSortLogical: "Looginen",
		SettingSortAlphabetically: "Aakkosjärjestys"
	},
	fr: {
		MergeFolder: "Fusionner le dossier",
		MergedFilesuffix: "fusionné",
		OverwriteFileQuestion: "Remplacer le fichier existant",
		Settings: "Paramètres",
		SettingIncludeNestedFolders: "Inclure les dossiers imbriqués",
		SettingIncludeNestedFoldersDescription: "Si activé, les fichiers des dossiers imbriqués seront inclus dans la fusion. Sinon, seuls les fichiers du dossier sélectionné seront fusionnés (comportement par défaut).",
		SettingIncludeFoldersAsSections: "Inclure les dossiers en tant que sections",
		SettingIncludeFoldersAsSectionsDescription: "Les dossiers seront inclus en tant que sections nommées dans le fichier de sortie.",
		Yes: "Oui",
		No: "Non",
		SettingSortMode: "mode de tri",
		SettingSortModeDescription: "Choisissez le mode de tri pour la fusion des notes.",
		SettingSortDateCreated: "Date de création",
		SettingSortLogical: "Logique",
		SettingSortAlphabetically: "Alphabétique"
	},
	ru: {
		MergeFolder: "Объединить папку",
		MergedFilesuffix: "совмещенный",
		OverwriteFileQuestion: "Перезаписать существующий файл",
		Settings: "Настройки",
		SettingIncludeNestedFolders: "Влючать вложенные папки",
		SettingIncludeNestedFoldersDescription: "Если включено, файлы во вложенных папках будут включены в слияние. В противном случае будут объединены только файлы в выбранной папке (поведение по умолчанию).",
		SettingIncludeFoldersAsSections: "Включать папки как разделы",
		SettingIncludeFoldersAsSectionsDescription: "Папки будут включены в выходной файл в качестве разделов.",
		Yes: "Да",
		No: "Нет",
		SettingSortMode: "режим сортировки",
		SettingSortModeDescription: "Выберите режим сортировки при объединении заметок.",
		SettingSortDateCreated: "Дата создания",
		SettingSortLogical: "Логический",
		SettingSortAlphabetically: "Алфавитный указатель"
	},
	ua: {
		MergeFolder: "Об'єднати папку",
		MergedFilesuffix: "об'єднані",
		OverwriteFileQuestion: "Перезаписати існуючий файл",
		Settings: "Налаштування",
		SettingIncludeNestedFolders: "Включити вкладені папки",
		SettingIncludeNestedFoldersDescription: "Якщо ввімкнено, файли у вкладених папках будуть включені в об’єднання. В іншому випадку буде об’єднано лише файли у вибраній папці (поведінка за замовчуванням).",
		SettingIncludeFoldersAsSections: "Включити папки як розділи",
		SettingIncludeFoldersAsSectionsDescription: "Папки будуть включені як іменовані розділи у вихідний файл.",
		Yes: "Так",
		No: "Ні",
		SettingSortMode: "Логический",
		SettingSortModeDescription: "Виберіть режим сортування для об'єднання нотаток.",
		SettingSortDateCreated: "Дата створення",
		SettingSortLogical: "Логічний",
		SettingSortAlphabetically: "За алфавітом"
	},
};

/**
 * Enum representing the available sorting options for merging notes.
 * If you add a new option, make sure to add it to the settings in 'AdvancedMergeSettingTab.display'.
 */
enum SortOptions {
	Alphabetically,
	CreationDate,
	Logical,
}

interface AdvancedMergePluginSettings {
	sortMode: SortOptions;
	includeNestedFolders: boolean;
	includeFoldersAsSections: boolean;
}

const DEFAULT_SETTINGS: AdvancedMergePluginSettings = {
	sortMode: SortOptions.Logical,
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
	public translation: AdvancedMergeTranslation;
	public settings: AdvancedMergePluginSettings;

	public async onload(): Promise<void> {
		this.translation = new AdvancedMergeTranslation();
		await this.loadSettings();

		this.registerEvent(
			this.app.workspace.on(HANDLER_LOCATION, (menu, file) => {
				if (!(file instanceof TFolder)) {
					return;
				}

				const folder = file;
				menu.addItem((item) => {
					item.setTitle(this.translation.get().MergeFolder)
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

		const documentEntries: Array<TFile> = [];
		Vault.recurseChildren(folder, (folderOrFile: TFile) => {
			// For merging we are including only *.md files
			if (
				folderOrFile instanceof TFile &&
				folderOrFile.extension == MARKDOWN_FILE_EXTENSION
			) {
				console.log(`Found a file: ${folderOrFile.name}`);
				documentEntries.push(folderOrFile);
			} else if (
				folderOrFile instanceof TFolder &&
				this.settings.includeFoldersAsSections
			) {
				console.log(`Found a folder: ${folderOrFile.name}`);
				documentEntries.push(folderOrFile);
			}
		});

		const entries = this.sortNotes(
			documentEntries.filter((entry) => this.filterNotes(folder, entry))
		);

		const outputFileName = `${folder.path}-${
			this.translation.get().MergedFilesuffix
		}.md`;
		const fileExists = await vault.adapter.exists(outputFileName, false);
		if (fileExists) {
			new AdvancedMergeOverwriteFileModal(
				this.app,
				this.translation,
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
			const sectionLevel = (folderOrFile.path.match(/\//g) || []).length;

			let sectionContents = `${index === 0 ? "" : NEW_LINE_CHAR}`;
			const lastEntry = index === entries.length - 1;

			if (folderOrFile instanceof TFile) {
				sectionContents += await vault.cachedRead(folderOrFile);
				const fileSectionName = folderOrFile.name.replace(/\.md$/, "");
				// For the first file in a row, we shouldnt add new line
				sectionContents = `${SECTION_CHAR.repeat(
					sectionLevel
				)} ${fileSectionName}${DOUBLE_NEW_LINE_CHAR}${sectionContents}${
					lastEntry ? "" : DOUBLE_NEW_LINE_CHAR
				}`;
				console.info(
					`Adding file "${folderOrFile.name}" as section "${fileSectionName}" into file "${outputFileName}"..`
				);
			} else if (folderOrFile instanceof TFolder) {
				sectionContents += `${SECTION_CHAR.repeat(sectionLevel)} ${
					folderOrFile.name
				}${DOUBLE_NEW_LINE_CHAR}`;
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
	private sortNotes(files: Array<TFile>): Array<TFile> {
		switch (this.settings.sortMode) {
			case SortOptions.Alphabetically:
				return files.sort((a, b) =>
					a.path.localeCompare(b.path, undefined, {
						numeric: true,
						sensitivity: "base",
						usage: "sort",
					})
				);
			case SortOptions.CreationDate:
				return files.sort((a, b) => a.stat.ctime - b.stat.ctime);
			case SortOptions.Logical:
			default:
				return files.reverse();
		}
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
	private includeFolderAsSectionSetting: Setting;

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
			text: `${PLUGIN_NAME} - ${this.plugin.translation.get().Settings}`,
		});

		// Add "sort mode" dropdown in settings
		new Setting(containerEl)
			.setName(this.plugin.translation.get().SettingSortMode)
			.setDesc(
				this.plugin.translation.get()
					.SettingSortModeDescription
			)
			.addDropdown((dropdown) =>
				dropdown.addOptions({
					[SortOptions.Alphabetically]: this.plugin.translation.get().SettingSortAlphabetically,
					[SortOptions.CreationDate]: this.plugin.translation.get().SettingSortDateCreated,
					[SortOptions.Logical]: this.plugin.translation.get().SettingSortLogical,
				})
			);

		// Add "include nested folders" toggle in settings
		new Setting(containerEl)
			.setName(this.plugin.translation.get().SettingIncludeNestedFolders)
			.setDesc(
				this.plugin.translation.get()
					.SettingIncludeNestedFoldersDescription
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.includeNestedFolders)
					.onChange(async (value) => {
						this.plugin.settings.includeNestedFolders = value;
						this.plugin.settings.includeFoldersAsSections =
							value === false
								? value
								: this.plugin.settings.includeFoldersAsSections;
						await this.plugin.saveSettings();
						this.showIncludeFolderAsSectionSetting(containerEl);
					})
			);

		this.showIncludeFolderAsSectionSetting(containerEl);
	}

	private showIncludeFolderAsSectionSetting(containerEl: HTMLElement): void {
		if (!this.plugin.settings.includeNestedFolders) {
			this.includeFolderAsSectionSetting?.settingEl?.remove();
			return;
		}

		// Add "include folders as sections" toggle in settings
		this.includeFolderAsSectionSetting = new Setting(containerEl)
			.setName(
				this.plugin.translation.get().SettingIncludeFoldersAsSections
			)
			.setDesc(
				this.plugin.translation.get()
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
	private tranlation: AdvancedMergeTranslation;
	private existingFileName: string;
	private onSubmitHandler: (result: boolean) => void;

	/**
	 * Represents an "Overwrite file?" dialog.
	 * @constructor
	 * @param {App} app - The `Obsidian` application object.
	 * @param {AdvancedMergeTranslation} translation - Plugin translation.
	 * @param {string} existingFileName - Existing file name.
	 * @param handler - Modal callback handler.
	 */
	constructor(
		app: App,
		translation: AdvancedMergeTranslation,
		existingFileName: string,
		handler: (result: boolean) => void
	) {
		super(app);
		this.tranlation = translation;
		this.existingFileName = existingFileName;
		this.onSubmitHandler = handler;
	}

	/**
	 * @inheritdoc
	 */
	public onOpen(): void {
		const { contentEl } = this;

		contentEl.createEl("h3", {
			text: `${this.tranlation.get().OverwriteFileQuestion} "${
				this.existingFileName
			}"?`,
		});

		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText(this.tranlation.get().No)
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmitHandler(false);
					})
			)
			.addButton((btn) =>
				btn
					.setButtonText(this.tranlation.get().Yes)
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmitHandler(true);
					})
			);
	}

	/**
	 * @inheritdoc
	 */
	public onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class AdvancedMergeTranslation {
	private language: string;

	/**
	 * Represents a plugin translation.
	 * @constructor
	 */
	constructor() {
		this.language = !Object.keys(TRANSLATIONS).contains(navigator.language)
			? DEFAULT_LANGUAGE
			: navigator.language;
	}

	/**
	 * Gets translation object for current language.
	 * @returns {Translation} Current translation object.
	 */
	public get(): Translation {
		return TRANSLATIONS[this.language];
	}
}
