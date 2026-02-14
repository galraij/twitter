export default function TweetsList({ createdAt, tweetContent, username }) {
    return (
        <div>

            <div>{new Date(createdAt).toLocaleString()}</div>

            <h3>{tweetContent}</h3>

            <p>{username}</p>
        </div>
    );
}