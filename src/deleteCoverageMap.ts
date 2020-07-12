import { CoverageStorage } from "./storage"

export const deleteCoverageMap = async (dir?: string) => {
    const coverageStorage = new CoverageStorage(process.env.JEST_PLAYWRIGHT_ISTANBUL_DIR || dir)
    coverageStorage.delete()
}
