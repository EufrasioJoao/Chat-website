import React from "react";
import { Router } from "./routes/Index";
import { AppContext } from "./context/Index";
import "./App.css";

function App() {
    return (
        <AppContext>
            <div className="app">
                <Router />
            </div>
        </AppContext>
    );
}

export default App;
