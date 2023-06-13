import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../home/Home"
import { Records } from "../records/Records";
import { Crates } from "../crates/Crates";
import { Digs } from "../digs/Digs";
import { RecordDetail } from "../records/RecordDetail";
import { RecordForm } from "../records/RecordForm";

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route
            path="/"
            element={
                <>
                <Home />
                </>
            }
            ></Route>
            <Route path="/myRecords" element={ <Records /> } />
            <Route path="/myCrates" element={ <Crates /> } />
            <Route path="/myDigs" element={ <Digs /> } />
            <Route path="/albums/:albumId" element={<RecordDetail />} />
            <Route path="/newAlbum" element={<RecordForm />} />
        </Routes>
    )
}