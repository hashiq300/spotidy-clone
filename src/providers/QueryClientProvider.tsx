"use client"

import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query"

type QueryClientProviderProps = {
    children: React.ReactNode
}

const queryClient = new QueryClient()

function QueryClientProvider({ children }: QueryClientProviderProps) {
    return (
        <QCP client={queryClient} >
            {children}
        </QCP>
    )
}

export default QueryClientProvider
