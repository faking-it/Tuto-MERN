import React from "react";
function History() {
    return (
        <div className={"sidecontent-container side-child"}>
            <h3>{"History"}</h3>
            <div className={"history-container"}>
                <div className={"free-container"}>
                    <h6>{"Free trees"}</h6>
                    <div>
                        <p>{"tree name"}</p>
                        <hr />
                    </div>
                </div>
                <div className={"free-container"}>
                    <h6>{"owned trees"}</h6>
                    <hr />
                    <div>
                        <p>{"tree name"}</p>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default History;