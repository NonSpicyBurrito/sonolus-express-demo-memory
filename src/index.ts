import * as express from 'express'
import { Sonolus } from 'sonolus-express'
import { installBandoriEngine } from './engine'
import { installUploadedLevels } from './levels'
import { installUploader } from './upload'

const port = 3000
const sonolusOptions = {
    version: '0.5.4',
    fallbackLocale: 'en',
}

const app = express()
app.use(express.static('./public'))

// installing Sonolus onto express app, which sets up necessary routes automatically
const sonolus = new Sonolus(app, sonolusOptions)
// loads static items packed by sonolus-pack in "./pack"
sonolus.load('./pack')

installBandoriEngine(sonolus)

installUploader(sonolus)
installUploadedLevels(sonolus)

app.listen(port, () => console.log('Server listening at port', port))
