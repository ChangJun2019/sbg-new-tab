import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({

  cli: {
    entry: {
      patterns: [`src/newtab.html`],
      outFile: `src/newtab.css`,
    },
  },

  presets:[
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
