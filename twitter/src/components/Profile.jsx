import { useState } from "react";


export default function Profile({ username, setUsername }) {
    const [value, setValue] = useState(username);

    function handleSubmit(e) {
        e.preventDefault();
        setUsername(value);
    }

    return (
        <div style={{ padding: "16px" }}>
            <h2>Profile</h2>

            <form onSubmit={handleSubmit}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}

                />
                <button type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}
