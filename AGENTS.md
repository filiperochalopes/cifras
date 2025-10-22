# Agent Guidelines for Cifras Project

## Build/Lint/Test Commands
This project uses pnpm for package management and live-server for development.

- **Install dependencies**: `pnpm install`
- **Development server**: `pnpm run dev` (starts live-server on port 3000)
- **No lint commands available** - No linter configured
- **No test commands available** - No testing framework configured

## Code Style Guidelines

### Language & Framework
- **JavaScript**: ES6+ vanilla JavaScript (no frameworks except jQuery for DOM manipulation)
- **HTML/CSS**: Standard HTML5 and CSS3
- **No build tools**: Direct file editing, no transpilation or bundling

### Naming Conventions
- **Classes**: PascalCase (e.g., `Cifra`, `Tablatura`, `Afinacao`)
- **Variables/Functions**: camelCase (e.g., `appState`, `renderDependingOnWindowSize`)
- **Constants**: camelCase (e.g., `dicionarioNotas`, `afinacoes`)
- **Files**: PascalCase for class files (e.g., `Cifra.js`), camelCase for utilities (e.g., `utils.js`)

### Code Structure
- **Classes**: Use ES6 class syntax with constructor and methods
- **Functions**: Prefer arrow functions for callbacks, regular functions for named exports
- **Variables**: Use `const` for immutable values, `let` for mutable variables
- **Modules**: No module system - all scripts loaded via HTML script tags in dependency order

### Formatting
- **Indentation**: 2 spaces (no tabs)
- **Semicolons**: Required at end of statements
- **Quotes**: Single quotes for strings (`'string'`)
- **Line Length**: No strict limit, break long lines naturally
- **Spacing**: Space after commas, around operators, before opening braces

### Imports & Dependencies
- **jQuery**: Local dependency via pnpm (version ^3.7.1)
- **live-server**: Development dependency for serving the application
- **No other dependencies**: All code is vanilla JavaScript
- **Script loading order**: Critical - load in this sequence:
  1. jQuery
  2. utils.js
  3. classes/Nota.js
  4. classes/Corda.js
  5. classes/Afinacao.js
  6. config.js
  7. classes/Notacao.js
  8. classes/Tablatura.js
  9. classes/Cifra.js
  10. main.js

### Error Handling
- **Console logging**: Use `console.log()` for debugging (remove in production)
- **Input validation**: Basic checks for undefined/null values
- **Exception handling**: Minimal - rely on browser defaults
- **User feedback**: Update DOM elements directly for user notifications

### Documentation
- **JSDoc**: Use for class and method documentation
- **Inline comments**: Use sparingly, only for complex logic
- **README**: Comprehensive project documentation in Portuguese

### State Management
- **Global state**: Use `appState` object for application state
- **DOM updates**: Direct jQuery manipulation
- **Event handling**: jQuery event listeners

### Best Practices
- **Performance**: Minimize DOM queries, cache jQuery selections
- **Browser compatibility**: Modern browsers only (ES6+ support required)
- **Security**: No server-side code, client-side only
- **Accessibility**: Basic HTML structure, no ARIA attributes
- **Mobile responsiveness**: CSS breakpoints for different screen sizes