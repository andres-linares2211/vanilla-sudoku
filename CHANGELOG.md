# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added script to translate elements that use the attribute `data-translate`.
- Added chronometer.
- Highlighter for cells with same value
- Listener for contextmenu (right click) to toggle the pencil
- Help Button to set a single value in the board

### Fixed

- Input listener was changed to keydown listener to better process the desired value.
- Input can receive have values from 1-9

## [3.3.0] 2021-04-20

### Added

- Add difficulty selector

## [3.2.1] 2021-04-20

### Fixed

- Restored highlight functionality

## [3.2.0] 2021-04-20

### Added

- New validations with Husky, CommitLint, ESLint and Prettier.
- Pencil Button to toggle pencil state.
- Pencil marks!

### Fixed

- Implemented ESLint suggestions on typescript code.
- Cells are always same size no matter inside content.
- Cell will lose focus after single input

## [3.1.1] - 2021-04-19

### Fixed

- Highlighter now works correctly.

### Changed

- Borders are now a bit smaller and a bit whiteish.

## [3.1.0] - 2021-04-19

### Added

- More colors!

### Changed

- Use different and better styles for board and cells.

### Removed

- Temporally removing numericTooltip until we find a better solution for mobile users.

## [1.0.0] - 2021-04-17
