import { CoverageMap, createCoverageMap } from "istanbul-lib-coverage"
import { CoverageStorage } from "./storage"
import multimatch from "multimatch"

async function getCoverage(page: any, include?: string[]): Promise<CoverageMap> {
    let coverage = await page.evaluate(() => (window as any).__coverage__)
    if (include && include.length) {
        const included = multimatch(Object.keys(coverage), include)
        coverage = included.reduce((obj, path) => {
            obj[path] = coverage[path]
            return obj
        }, {} as { [key: string]: unknown })
    }

    return createCoverageMap(coverage)
}

interface Options {
    coverageDirectory?: string
    include?: string[]
}

export const collectCoverage = async (page: any, options?: Options) => {
    const path =
        process.env.JEST_PLAYWRIGHT_ISTANBUL_DIR ||
        (options && options.coverageDirectory ? options.coverageDirectory : undefined)
    const coverageStorage = new CoverageStorage(path)
    if (typeof page === "undefined") return
    const coverageMap = await getCoverage(page, options && options.include)
    coverageMap.merge(coverageStorage.read())
    coverageStorage.write(coverageMap)
}
