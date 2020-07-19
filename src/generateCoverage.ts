import { CoverageStorage } from "./storage"
import { createCoverageMap, FileCoverage } from "istanbul-lib-coverage"
import libReport from "istanbul-lib-report"
import reports from "istanbul-reports"
import { ReportOptions } from "istanbul-reports"

interface Options {
    coverageDirectory?: string
}

export const generateCoverage = <T extends keyof ReportOptions>(
    name: T,
    options?: Partial<ReportOptions[T]> & Options,
) => {
    const path =
        process.env.JEST_PLAYWRIGHT_ISTANBUL_DIR ||
        (options && options.coverageDirectory ? options.coverageDirectory : undefined)
    const coverageStorage = new CoverageStorage(path)

    const coverageMap = createCoverageMap({})

    const mergeFileCoverage = ([filename, fileCoverage]: [string, FileCoverage]) => {
        coverageMap.merge({ [filename]: fileCoverage })
    }

    Object.entries(coverageStorage.read()).forEach(mergeFileCoverage)

    if (!Object.keys(coverageMap).length) {
        return
    }

    const context = libReport.createContext({
        dir: "./coverage",
        coverageMap,
    })
    const report = reports.create(name, options)
    ;(report as any).execute(context)
}
