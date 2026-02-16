import { useState, useEffect } from "react";
import AddTweet from "./components/AddTweet";
import TweetsList from "./components/TweetsList";

let username = "Gal";

export default function App() {

  // for local storage
  // const [tweets, setTweets] = useState(() => {
  //   const savedTweets = localStorage.getItem("tweets");
  //
  //   if (savedTweets) {
  //     return JSON.parse(savedTweets);
  //   }
  //
  //   return [];
  // });
  //
  // useEffect(() => {
  //   localStorage.setItem("tweets", JSON.stringify(tweets));
  // }, [tweets]);
  //
  // function addTweet(text) {
  //   const newTweet = {
  //     id: Date.now(),
  //     text: text,
  //     username: username,
  //     createdAt: new Date().toISOString(),
  //   };

  const [tweets, setTweets] = useState([]);

  const API_URL =
    "https://agsaphbcwazvuenwsnca.supabase.co/rest/v1/Tweets?apikey=sb_publishable_3kTDeTVg6NfWrboe7oMopA_X-cuT_ih";

  useEffect(() => {
    async function fetchTweets() {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTweets(data);
    }
    fetchTweets();
  }, []);

  async function addTweet(text) {
    const payload = {
      content: text,
      userName: username,
      date: new Date().toISOString(),
    };

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    const res = await fetch(API_URL);
    const data = await res.json();
    setTweets([...data].sort((a, b) => new Date(b.date) - new Date(a.date)));
  }

  return (
    <>
      <div>
        <AddTweet onAdd={addTweet} />
      </div>

      <div>
        {tweets.map((tweet, index) => (
          <TweetsList
            key={tweet.id}
            createdAt={tweet.date}
            tweetContent={tweet.content}
            username={tweet.userName}
          />
        ))}
      </div>
    </>
  );
}
