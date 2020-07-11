/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { CoverageMap, createCoverageMap } from "istanbul-lib-coverage"
import { CoverageStorage } from "./storage"

const coverageStorage = new CoverageStorage(process.env.JEST_PLAYWRIGHT_ISTANBUL_DIR)

async function getCoverage(page: any): Promise<CoverageMap> {
    const coverage = await page.evaluate(() => (window as any).__coverage__)
    return createCoverageMap(coverage)
}

afterEach(async () => {
    if (process.env.JEST_PLAYWRIGHT_ISTANBUL_COVERAGE !== "true") return
    // @ts-ignore
    if (typeof page === "undefined") return
    // @ts-ignore
    const coverageMap = await getCoverage(page)
    coverageMap.merge(coverageStorage.read())
    coverageStorage.write(coverageMap)
})
