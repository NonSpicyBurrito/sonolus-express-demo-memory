import { readdirSync, readJsonSync } from 'fs-extra'
import { Sonolus } from 'sonolus-express'

export const levelsPath = './levels'

export function installUploadedLevels(sonolus: Sonolus): void {
    // loop over "./levels" folder and load each level
    readdirSync('./levels').forEach((name) => loadLevel(sonolus, name))
    sortLevels(sonolus)
}

export function loadLevel(sonolus: Sonolus, name: string): void {
    // files of each level resides in "./levels/:name"
    const info = readJsonSync(`./levels/${name}/info`)
    sonolus.db.levels.push({
        name,
        ...info,
        // using file path in sonolus.add is preferred over file content buffer
        // this allows file content to be read on demand rather than be kept in memory
        cover: sonolus.add('LevelCover', `./levels/${name}/cover`),
        bgm: sonolus.add('LevelBgm', `./levels/${name}/bgm`),
        data: sonolus.add('LevelData', `./levels/${name}/data`),
    })
}

export function sortLevels(sonolus: Sonolus): void {
    // simply sorting levels by their names
    sonolus.db.levels.sort((a, b) => b.name.localeCompare(a.name))
}
