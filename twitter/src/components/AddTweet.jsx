import { useState } from "react";

export default function AddTweet({ onAdd }) {

    const [tweetContent, setTweetContent] = useState("");


    function handleAddClick() {


        onAdd(tweetContent);

        setTweetContent("");

    }

    return (
        <div>
            <h2>Tweet</h2>

            <div>

                <input
                    type="text"
                    value={tweetContent}
                    onChange={(e) => setTweetContent(e.target.value)}
                />
            </div>



            <div style={{ marginTop: "10px" }}>
                <button type="button" onClick={handleAddClick}>tweet</button>
            </div>
        </div>
    );
}