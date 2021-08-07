import { outputFile, outputJson } from 'fs-extra'
import * as multer from 'multer'
import { memoryStorage } from 'multer'
import { fromBestdori } from 'sonolus-bandori-engine'
import { Sonolus } from 'sonolus-express'
import { promisify } from 'util'
import { gzip } from 'zlib'
import { engineName } from './engine'
import { levelsPath, loadLevel, sortLevels } from './levels'

const upload = multer({ storage: memoryStorage() })

export function installUploader(sonolus: Sonolus): void {
    sonolus.app.post(
        '/upload',
        upload.fields([
            { name: 'cover', maxCount: 1 },
            { name: 'bgm', maxCount: 1 },
        ]),
        async (req, res) => {
            try {
                if (!req.files || Array.isArray(req.files))
                    throw 'Unexpected multer result'

                // use upload time as name
                const name = Date.now().toString(16)

                // write info to "levels/:name/info"
                await outputJson(`${levelsPath}/${name}/info`, {
                    version: 1,
                    engine: engineName,
                    useSkin: { useDefault: true },
                    useBackground: { useDefault: true },
                    useEffect: { useDefault: true },
                    useParticle: { useDefault: true },
                    title: { en: req.body.title },
                    artists: { en: req.body.artists },
                    author: { en: req.body.author },
                    description: { en: req.body.description },
                    rating: req.body.rating,
                })

                // write cover to "levels/:name/cover"
                await outputFile(
                    `${levelsPath}/${name}/cover`,
                    req.files.cover[0].buffer
                )

                // write bgm to "levels/:name/bgm"
                await outputFile(
                    `${levelsPath}/${name}/bgm`,
                    req.files.bgm[0].buffer
                )

                // write data to "levels/:name/data"
                await outputFile(
                    `${levelsPath}/${name}/data`,
                    await toLevelData(req.body.chart)
                )

                // load newly uploaded level and re-sort
                loadLevel(sonolus, name)
                sortLevels(sonolus)

                res.send('Success!')
            } catch (e) {
                console.error(e)
                res.status(500).end()
            }
        }
    )
}

async function toLevelData(chart: string) {
    const data = JSON.stringify(fromBestdori(JSON.parse(chart)))
    return promisify(gzip)(data, { level: 9 })
}
