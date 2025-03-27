/**
 * Enum representing the available sorting options for merging notes.
 * If you add a new option, make sure to add it to the settings in 'AdvancedMergeSettingTab.display'.
 */
export interface AdvancedMergePluginSettings {
	sortMode: "alphabetical" | "creationDate" | "logical";
	includeNestedFolders: boolean;
	includeFoldersAsSections: boolean;
	removeYamlProperties: boolean;
}

export const DEFAULT_SETTINGS: AdvancedMergePluginSettings = {
	sortMode: "logical",
	includeNestedFolders: false,
	includeFoldersAsSections: false,
	removeYamlProperties: false,
};
