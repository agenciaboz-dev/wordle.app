import React from "react"
import { BrowserRouter, Routes as ReacRoutes, Route } from "react-router-dom"
import { Home } from "./pages/Home"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <BrowserRouter>
            <ReacRoutes>
                <Route index element={<Home />} />
            </ReacRoutes>
        </BrowserRouter>
    )
}
