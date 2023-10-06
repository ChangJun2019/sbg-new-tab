import path from 'node:path'
import { fileURLToPath } from 'node:url';
import { rimrafSync } from 'rimraf'
import { mkdirp } from 'mkdirp'
import compressing from 'compressing'
import { consola } from 'consola'


async function build() {
  try {
    const FILE_NAME = 'StartNewTab'
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const targetDir = path.join(__dirname, '../', 'dist')
    const target = path.join(targetDir, FILE_NAME)
    const source = path.join(__dirname, '../src/')
    rimrafSync(targetDir)
    mkdirp.sync(targetDir)
    await compressing.zip.compressDir(source, `${target}.zip`)
    await compressing.tar.compressDir(source, `${target}.tar`)
  }
  catch (error) {
    consola.error(error)
  }
}

build()
