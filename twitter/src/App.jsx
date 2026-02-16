import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddTweet from "./components/AddTweet";
import TweetsList from "./components/TweetsList";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";

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

  const API_URL =
    "https://agsaphbcwazvuenwsnca.supabase.co/rest/v1/Tweets?apikey=sb_publishable_3kTDeTVg6NfWrboe7oMopA_X-cuT_ih";

  // username (saved locally)
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "Gal";
  });

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  // tweets from server
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetchTweets() {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTweets([...data].sort((a, b) => new Date(b.date) - new Date(a.date)));
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
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
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
          }
        />

        <Route
          path="/profile"
          element={<Profile username={username} setUsername={setUsername} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
