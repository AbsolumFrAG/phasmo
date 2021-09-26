import { useEffect, useState } from 'react'
import App from './App'
import { LATEST_VERSION } from './data/versions'
import { DataType, loadData } from './util/data'

export function DataLoaderWrapper() {
    const [version, setVersion] = useState(LATEST_VERSION)
    const [data, setData] = useState<null | DataType>(null)
    const [isLoading, setIsLoading] = useState(false)

    const loadVersion = (version: string) => {
        setIsLoading(true)
        loadData(version).then((loadedData) => {
            setIsLoading(false)
            setData(loadedData)
        })
    }

    useEffect(() => {
        loadVersion(version)
    }, [version])

    return (
        <App
            data={data}
            version={version}
            setVersion={setVersion}
            isLoading={isLoading}
        />
    )
}