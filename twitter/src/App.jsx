import { useState } from "react";
import AddTweet from "./components/AddTweet";
import TweetsList from "./components/TweetsList";


let username = "Gal";

export default function App() {
  const [tweets, setTweets] = useState([]);

  function addTweet(text) {
    const newTweet = {
      id: Date.now(),
      text: text,
      username: username,
      createdAt: new Date(),
    };

    // old method: first create a new array, then setTweets
    const updatedTweets = [...tweets, newTweet].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setTweets(updatedTweets);
  }

  return (
    <>
      <div>
        <AddTweet onAdd={addTweet} />
      </div>

      <div>
        {tweets.map((tweet) => (
          <TweetsList
            key={tweet.id}
            createdAt={tweet.createdAt}
            tweetContent={tweet.text}
            username={tweet.username}
          />
        ))}
      </div>

    </>
  );
}