import { CoverageMap, createCoverageMap } from "istanbul-lib-coverage"
import { CoverageStorage } from "./storage"

async function getCoverage(page: any): Promise<CoverageMap> {
    const coverage = await page.evaluate(() => (window as any).__coverage__)
    return createCoverageMap(coverage)
}

export const collectCoverage = async (page: any, dir?: string) => {
    const coverageStorage = new CoverageStorage(process.env.JEST_PLAYWRIGHT_ISTANBUL_DIR || dir)
    if (typeof page === "undefined") return
    const coverageMap = await getCoverage(page)
    coverageMap.merge(coverageStorage.read())
    coverageStorage.write(coverageMap)
}
