import { CoverageMap, createCoverageMap } from "istanbul-lib-coverage"
import { CoverageStorage } from "./storage"

const coverageStorage = new CoverageStorage(process.env.JEST_PLAYWRIGHT_ISTANBUL_DIR)

async function getCoverage(page: any): Promise<CoverageMap> {
    const coverage = await page.evaluate(() => (window as any).__coverage__)
    return createCoverageMap(coverage)
}

export const setCoverage = async (page: any) => {
    if (typeof page === "undefined") return
    const coverageMap = await getCoverage(page)
    coverageMap.merge(coverageStorage.read())
    coverageStorage.write(coverageMap)
}
