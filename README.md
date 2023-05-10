# Obsidian Advanced Merge
Merge a folder of notes for easier export. This plugin is designed for [obsidian](https://obsidian.md/) app.

![preview](https://github.com/antoKeinanen/obsidian-advanced-merger/blob/master/media/1%200Ghz5j7MB_oKJdxoIc5-lg.gif?raw=true)
<p align="center">
Preview of the plugin. Image by
<a href="https://medium.com/technology-hits/obsidian-plugins-review-14-20d087f0e23a">Nuno Campos</a>
</p>

# Installation
## Installation through Obsidian community marketplace
This plugin can now be installed inside obsidian in the community plugins tab. [Link](obsidian://show-plugin?id=advanced-merger)
1. Go to obsidian settings panel.
2. Open community plugins tab.
3. Browse community plugins.
4. Search `Advanced Merger`.
5. Install and enable the plugin.

## Manual installation
1. Download the latest release from [releases page](https://github.com/antoKeinanen/obsidian-advanced-merger/releases).
2. Extract the zip archive.
3. Move the 2 files (`manifest.json`, and `main.js`) to `<your obsidian vault folder>/.obsidian/plugins/obsidian-advanced-merger`
4. Start obsidian, go to settings>community plugins, and turn `Advanced merger` on.

# Usage
Using Advanced merge is very easy! Just right click a folder and select `merge folder`.

# Contributing
To build and test this repository it is adviced to create a new vault. Clone this repository to `<your obsidian vault folder>/.obsidian/plugins/` and run `yarn install` and `yarn build` or `npm install` and `npm build` inside of is. Then in obsidian toggle the plugin on and off to refresh it.

All contribuitons are welcome, but before making anything big please concider starting a discussion in the issues tab.

# Code of conduct
- Make sure your code is formatted.
- Use angular commit message style. More info [here](https://github.com/antoKeinanen/obsidian-advanced-merger#commit-message-format).
## Commit message format
*This specification is inspired by and supersedes the [AngularJS commit message format.](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)*

This format leads to easier to read commit history.
All commit messages must comform to this format:
```
<header>
<BLANK LINE>
<body>
```
## Commit Header
The type field is always required. Summary is optional when bumping version. Every commit should only contain one type.
```
<type>: <short summary>
  │           │
  │           └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │
  │
  └─⫸ Commit Type: build|docs|feat|fix|perf|refactor|test
```
### Type
Must be one of the following:
- build: Changes that affect the build system or external dependencies
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding new tests or correcting existing tests

## Summary
Use the summary field to provide a succinct description of the change:
- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end


# Support
You can support me by buying me a coffee at [buymeacoffee.com](https://www.buymeacoffee.com/antokeinanen)!