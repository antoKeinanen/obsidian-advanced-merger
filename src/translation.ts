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
	SettingRemoveYamlProperties: string;
	SettingRemoveYamlPropertiesDescription: string;
	SettingIncludeFilenames: string;
	SettingIncludeFilenamesDescription: string;
	Yes: string;
	No: string;
}

export const TRANSLATIONS: Record<string, Translation> = {
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
		SettingRemoveYamlProperties: "YAML-Eigenschaften entfernen",
		SettingRemoveYamlPropertiesDescription:
			"Entfernt YAML-Eigenschaften vom Anfang der Datei während des Zusammenführens. WARNUNG: Dies könnte unbeabsichtigt nicht-YAML-Teile entfernen.",
		SettingIncludeFilenames: "Dateinamen einbeziehen",
		SettingIncludeFilenamesDescription: "Wenn aktiviert, werden die Dateinamen in die Ausgabedatei aufgenommen.",
	},
	en: {
		MergeFolder: "Merge folder",
		MergedFilesuffix: "merged",
		OverwriteFileQuestion: "Overwrite existing file",
		Settings: "Settings",
		SettingIncludeNestedFolders: "Include nested folders",
		SettingIncludeNestedFoldersDescription:
			"If enabled, files in nested folders will be included in the merge. Otherwise, only files in the selected folder will be merged (default behavior).",
		SettingIncludeFoldersAsSections: "Include folders as sections",
		SettingIncludeFoldersAsSectionsDescription:
			"Folders will be included as named sections in the output file.",
		Yes: "Yes",
		No: "No",
		SettingSortMode: "Sort mode",
		SettingSortModeDescription:
			"Choose the sorting mode for merging notes.",
		SettingSortDateCreated: "Date created",
		SettingSortLogical: "Logical",
		SettingSortAlphabetically: "Alphabetical",
		SettingRemoveYamlProperties: "Remove YAML properties",
		SettingRemoveYamlPropertiesDescription:
			"Removes YAML properties from the top of the file during the merge. WARNING: This might unintentionally remove non yaml parts.",
		SettingIncludeFilenames: "Include filenames",
		SettingIncludeFilenamesDescription: "If enabled, filenames will be included in the output file.",
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
		SettingSortMode: "Lajittelujärjestys",
		SettingSortModeDescription:
			"Valitse lajittelutapa muistiinpanojen yhdistämistä varten.",
		SettingSortDateCreated: "Luontipäivämäärä",
		SettingSortLogical: "Looginen",
		SettingSortAlphabetically: "Aakkosjärjestys",
		SettingRemoveYamlProperties: "Poista YAML-osio",
		SettingRemoveYamlPropertiesDescription:
			"Poistaa YAML-osio tiedoston yläosasta yhdistämisen aikana. VAROITUS: Tämä voi vahingossa poistaa ei-YAML-osia.",
		SettingIncludeFilenames: "Sisällytä tiedostonimet",
		SettingIncludeFilenamesDescription: "Jos käytössä, tiedostonimet sisällytetään tulostiedostoon.",
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
		SettingRemoveYamlProperties: "Supprimer les propriétés YAML",
		SettingRemoveYamlPropertiesDescription:
			"Supprime les propriétés YAML du haut du fichier lors de la fusion. ATTENTION : Cela pourrait supprimer accidentellement des parties non YAML.",
		SettingIncludeFilenames: "Inclure les noms de fichiers",
		SettingIncludeFilenamesDescription: "Si activé, les noms de fichiers seront inclus dans le fichier de sortie.",
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
		SettingRemoveYamlProperties: "Удалить свойства YAML",
		SettingRemoveYamlPropertiesDescription:
			"Удаляет свойства YAML из верхней части файла во время объединения. ВНИМАНИЕ: Это может случайно удалить не-YAML части.",
		SettingIncludeFilenames: "Включать имена файлов",
		SettingIncludeFilenamesDescription: "Если включено, имена файлов будут включены в выходной файл.",
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
		SettingRemoveYamlProperties: "Видалити властивості YAML",
		SettingRemoveYamlPropertiesDescription:
			"Видаляє властивості YAML із верхньої частини файлу під час об'єднання. УВАГА: Це може випадково видалити не-YAML частини.",
		SettingIncludeFilenames: "Включити імена файлів",
		SettingIncludeFilenamesDescription: "Якщо ввімкнено, імена файлів будуть включені у вихідний файл.",
	},
};

export class AdvancedMergeTranslation {
	private language: string;

	/**
	 * Represents a plugin translation.
	 * @constructor
	 */
	constructor() {
		this.language = !Object.keys(TRANSLATIONS).includes(navigator.language)
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
