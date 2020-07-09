import { CoverageStorage } from "./storage"
import { createCoverageMap, FileCoverage } from "istanbul-lib-coverage"
import libReport from "istanbul-lib-report"
import reports from "istanbul-reports"

export const generateCoverage = (dir?: string) => {
    const coverageStorage = new CoverageStorage(process.env.JEST_PLAYWRIGHT_ISTANBUL_DIR || dir)
    const coverageMap = createCoverageMap({})

    const mergeFileCoverage = ([filename, fileCoverage]: [string, FileCoverage]) => {
        coverageMap.merge({ [filename]: fileCoverage })
    }

    Object.entries(coverageStorage.read()).map(mergeFileCoverage)

    if (!Object.keys(coverageMap).length) {
        return
    }

    const context = libReport.createContext({
        dir: "./coverage",
        coverageMap,
    })
    const report = reports.create("html")
    ;(report as any).execute(context)
}
