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
import { AdvancedMergePluginSettings, DEFAULT_SETTINGS } from "./settings";
import {
	DOUBLE_NEW_LINE_CHAR,
	HANDLER_LOCATION,
	ICON_NAME,
	MARKDOWN_FILE_EXTENSION,
	NEW_LINE_CHAR,
	PLUGIN_NAME,
	SECTION_CHAR,
} from "./constants";
import { AdvancedMergeTranslation } from "./translation";

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
								await this.onClickCallback(folder, evt),
						);
				});
			}),
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new AdvancedMergeSettingTab(this.app, this));
	}

	private async onClickCallback(
		folder: TFolder,
		_evt: MouseEvent | KeyboardEvent,
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
			documentEntries.filter((entry) => this.filterNotes(folder, entry)),
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
							`file "${outputFileName}" already exists, but user cancelled deleting..`,
						);
						return;
					}

					console.info(
						`file "${outputFileName}" already exists, deleting..`,
					);
					await vault.adapter.remove(outputFileName);

					await this.mergeNotes(vault, entries, outputFileName);
				},
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
		outputFileName: string,
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
					sectionLevel,
				)} ${fileSectionName}${DOUBLE_NEW_LINE_CHAR}${sectionContents}${
					lastEntry ? "" : DOUBLE_NEW_LINE_CHAR
				}`;
				console.info(
					`Adding file "${folderOrFile.name}" as section "${fileSectionName}" into file "${outputFileName}"..`,
				);
			} else if (folderOrFile instanceof TFolder) {
				sectionContents += `${SECTION_CHAR.repeat(sectionLevel)} ${
					folderOrFile.name
				}${DOUBLE_NEW_LINE_CHAR}`;
				console.info(
					`Adding folder "${folderOrFile.name}" as section "${sectionContents}" into file "${outputFileName}"..`,
				);
			}

			if (this.settings.removeYamlProperties) {
				sectionContents = sectionContents.replace(
					/---\n(\w*:\s.*\n)*---/,
					"",
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
			case "alphabetical":
				return files.sort((a, b) => a.name.localeCompare(b.name));
			case "creationDate":
				return files.sort((a, b) => a.stat.ctime - b.stat.ctime);
			case "logical":
			default:
				return files.sort((a, b) =>
					a.path.localeCompare(b.path, undefined, {
						numeric: true,
						sensitivity: "base",
						usage: "sort",
					}),
				);
		}
	}

	/**
	 * De-serializes settings from persistent storage.
	 */
	private async loadSettings(): Promise<void> {
		const data = await this.loadData();
		console.log("Loaded settings", data);
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	/**
	 * Serializes settings into persistent storage.
	 */
	public async saveSettings(): Promise<void> {
		console.log("Saving settings", this.settings);
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
			.setDesc(this.plugin.translation.get().SettingSortModeDescription)
			.addDropdown((dropdown) =>
				dropdown
					.addOptions({
						alphabetical:
							this.plugin.translation.get()
								.SettingSortAlphabetically,
						creationDate:
							this.plugin.translation.get()
								.SettingSortDateCreated,
						logical:
							this.plugin.translation.get().SettingSortLogical,
					})
					.onChange(async (value) => {
						this.plugin.settings.sortMode = value as
							| "alphabetical"
							| "creationDate"
							| "logical";
						await this.plugin.saveSettings();
					})
					.setValue(this.plugin.settings.sortMode),
			);

		// Add "include nested folders" toggle in settings
		new Setting(containerEl)
			.setName(this.plugin.translation.get().SettingIncludeNestedFolders)
			.setDesc(
				this.plugin.translation.get()
					.SettingIncludeNestedFoldersDescription,
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
					}),
			);

		// Add "remove yaml properties" toggle in settings
		new Setting(containerEl)
			.setName(this.plugin.translation.get().SettingRemoveYamlProperties)
			.setDesc(
				this.plugin.translation.get()
					.SettingRemoveYamlPropertiesDescription,
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.removeYamlProperties)
					.onChange(async (value) => {
						this.plugin.settings.removeYamlProperties = value;
						this.plugin.settings.removeYamlProperties =
							value === false
								? value
								: this.plugin.settings.removeYamlProperties;
						await this.plugin.saveSettings();
					}),
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
				this.plugin.translation.get().SettingIncludeFoldersAsSections,
			)
			.setDesc(
				this.plugin.translation.get()
					.SettingIncludeFoldersAsSectionsDescription,
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.includeFoldersAsSections)
					.onChange(async (value) => {
						this.plugin.settings.includeFoldersAsSections = value;
						await this.plugin.saveSettings();
					}),
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
		handler: (result: boolean) => void,
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
					}),
			)
			.addButton((btn) =>
				btn
					.setButtonText(this.tranlation.get().Yes)
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmitHandler(true);
					}),
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
