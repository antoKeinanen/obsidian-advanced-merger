import { DEFAULT_LANGUAGE } from "./constants";

export interface Translation {
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

export const TRANSLATIONS: { [name: string]: Translation } = {
	de: {
		MergeFolder: "Ordner zusammenführen",
		MergedFilesuffix: "zusammengeführt",
		OverwriteFileQuestion: "Vorhandene Datei überschreiben",
		Settings: "Einstellungen",
		SettingIncludeNestedFolders: "Verschachtelte Ordner einbeziehen",
		SettingIncludeNestedFoldersDescription:
			"Wenn aktiviert, werden Dateien in verschachtelten Ordnern zusammengeführt. Andernfalls werden nur Dateien im ausgewählten Ordner zusammengeführt (Standardverhalten).",
		SettingIncludeFoldersAsSections: "Ordner als Abschnitte einbeziehen",
		SettingIncludeFoldersAsSectionsDescription:
			"Ordner werden als benannte Abschnitte in die Ausgabedatei eingefügt.",
		Yes: "Ja",
		No: "Nein",
		SettingSortMode: "Sortiermodus",
		SettingSortModeDescription:
			"Wählen Sie den Sortiermodus für das Zusammenführen von Notizen.",
		SettingSortDateCreated: "Erstellungsdatum",
		SettingSortLogical: "Logisch",
		SettingSortAlphabetically: "Alphabetisch",
	},
	en: {
		MergeFolder: "Merge folder",
		MergedFilesuffix: "merged",
		OverwriteFileQuestion: "Overwite exising file",
		Settings: "Settings",
		SettingIncludeNestedFolders: "Include nested folders",
		SettingIncludeNestedFoldersDescription:
			"If enabled, files in nested folders will be included in merge. Otherwise, only files in selected folder will be merged (default behaviour).",
		SettingIncludeFoldersAsSections: "Include folders as sections",
		SettingIncludeFoldersAsSectionsDescription:
			"Folders will be included as named sections into output file.",
		Yes: "Yes",
		No: "No",
		SettingSortMode: "Sort mode",
		SettingSortModeDescription: "Pick the sorting mode for merging notes.",
		SettingSortDateCreated: "Date created",
		SettingSortLogical: "Logical",
		SettingSortAlphabetically: "Alphabetical",
	},
	fi: {
		MergeFolder: "Yhdistä kansio",
		MergedFilesuffix: "yhdistetty",
		OverwriteFileQuestion: "Korvaa olemassa oleva tiedosto",
		Settings: "Asetukset",
		SettingIncludeNestedFolders: "Sisällytä sisäkkäiset kansiot",
		SettingIncludeNestedFoldersDescription:
			"Jos käytössä, sisäkkäisten kansioiden tiedostot yhdistetään. Muussa tapauksessa vain valitun kansion tiedostot yhdistetään (oletustoiminto).",
		SettingIncludeFoldersAsSections: "Sisällytä kansiot osioihin",
		SettingIncludeFoldersAsSectionsDescription:
			"Kansiot sisällytetään nimettyinä osina tulostiedostoon.",
		Yes: "Kyllä",
		No: "Ei",
		SettingSortMode: "Lajittelu järjestys",
		SettingSortModeDescription:
			"Valitse lajittelutapa muistiinpanojen yhdistämistä varten.",
		SettingSortDateCreated: "Luontipäivämäärä",
		SettingSortLogical: "Looginen",
		SettingSortAlphabetically: "Aakkosjärjestys",
	},
	fr: {
		MergeFolder: "Fusionner le dossier",
		MergedFilesuffix: "fusionné",
		OverwriteFileQuestion: "Remplacer le fichier existant",
		Settings: "Paramètres",
		SettingIncludeNestedFolders: "Inclure les dossiers imbriqués",
		SettingIncludeNestedFoldersDescription:
			"Si activé, les fichiers des dossiers imbriqués seront inclus dans la fusion. Sinon, seuls les fichiers du dossier sélectionné seront fusionnés (comportement par défaut).",
		SettingIncludeFoldersAsSections:
			"Inclure les dossiers en tant que sections",
		SettingIncludeFoldersAsSectionsDescription:
			"Les dossiers seront inclus en tant que sections nommées dans le fichier de sortie.",
		Yes: "Oui",
		No: "Non",
		SettingSortMode: "mode de tri",
		SettingSortModeDescription:
			"Choisissez le mode de tri pour la fusion des notes.",
		SettingSortDateCreated: "Date de création",
		SettingSortLogical: "Logique",
		SettingSortAlphabetically: "Alphabétique",
	},
	ru: {
		MergeFolder: "Объединить папку",
		MergedFilesuffix: "совмещенный",
		OverwriteFileQuestion: "Перезаписать существующий файл",
		Settings: "Настройки",
		SettingIncludeNestedFolders: "Влючать вложенные папки",
		SettingIncludeNestedFoldersDescription:
			"Если включено, файлы во вложенных папках будут включены в слияние. В противном случае будут объединены только файлы в выбранной папке (поведение по умолчанию).",
		SettingIncludeFoldersAsSections: "Включать папки как разделы",
		SettingIncludeFoldersAsSectionsDescription:
			"Папки будут включены в выходной файл в качестве разделов.",
		Yes: "Да",
		No: "Нет",
		SettingSortMode: "режим сортировки",
		SettingSortModeDescription:
			"Выберите режим сортировки при объединении заметок.",
		SettingSortDateCreated: "Дата создания",
		SettingSortLogical: "Логический",
		SettingSortAlphabetically: "Алфавитный указатель",
	},
	ua: {
		MergeFolder: "Об'єднати папку",
		MergedFilesuffix: "об'єднані",
		OverwriteFileQuestion: "Перезаписати існуючий файл",
		Settings: "Налаштування",
		SettingIncludeNestedFolders: "Включити вкладені папки",
		SettingIncludeNestedFoldersDescription:
			"Якщо ввімкнено, файли у вкладених папках будуть включені в об’єднання. В іншому випадку буде об’єднано лише файли у вибраній папці (поведінка за замовчуванням).",
		SettingIncludeFoldersAsSections: "Включити папки як розділи",
		SettingIncludeFoldersAsSectionsDescription:
			"Папки будуть включені як іменовані розділи у вихідний файл.",
		Yes: "Так",
		No: "Ні",
		SettingSortMode: "Логический",
		SettingSortModeDescription:
			"Виберіть режим сортування для об'єднання нотаток.",
		SettingSortDateCreated: "Дата створення",
		SettingSortLogical: "Логічний",
		SettingSortAlphabetically: "За алфавітом",
	},
};

export class AdvancedMergeTranslation {
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
