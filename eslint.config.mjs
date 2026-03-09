import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: ['.next/**', 'out/**', 'dist/**', 'node_modules/**', '*.config.js']
  },
  ...pluginVue.configs['flat/essential'],
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser
      },
      globals: {
        ...globals.browser
      }
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      'no-unused-vars': 'off',
      'vue/no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  }
)
