import axios from "axios";
import { useState, useMemo, useEffect, useCallback } from "react";
export default function SendMessage() {
  const [chat, setChat] = useState();
 const [hideSendBtn, setBtn] = useState("block");
  const [timeStamps, setStamps] = useState([]);
  const [replied, setReplied] = useState();
  const [allChats, setAllChats] = useState([]);
  const [allReplies, setAllReplies] = useState([]);

  const Message =() => {
    const options = {
      method: "POST",
      url: "https://waifu.p.rapidapi.com/v1/waifu",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": `${import.meta.env.VITE_RAPID_KEY}`,
        "X-RapidAPI-Host": "waifu.p.rapidapi.com",
      },
      data: {
        user_id: "sample_user_id",
        message: chat,
        from_name: "Boy",
        to_name: "Boy",
        situation: "Boy reads Boy",
        translate_from: "auto",
        translate_to: "auto",
      },
    };

 axios
      .request(options)
      .then((response) => {
        setReplied(response.status);
        setAllReplies([...allReplies, response.data.response]);
       
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => Message(), [chat]);

  const onChange =() => {
    const datetime = new Date();
    setStamps([...timeStamps, datetime.toLocaleTimeString()]);
    const text = document.querySelector("#text-input")
    text.value.length != 0 ? setChat(text.value) :alert("Message box can't be empty")
     text.value.length !=0 && setAllChats([...allChats, text.value])
    text.value = "";
    setBtn("none")
   
  }
  return (
    <main className="p-2">
      <header className="alert alert-warning" id="header">
        <div className="text-start"><h4>Let's Chat!</h4><br/><span>Ask any question. I am your friend so feel free...!</span></div>
        <img height="50px" src="/bot.png" />
      </header>
      <div className="text-center">
        <p>Start a conversation with Me😘</p>
        <span>{Date()}</span>
      </div>
      <div className="p-1 mb-5">
        {allChats.map((chats, index) => {
          return (
            <>
              <div id="chat-div" key={chats}>
                {chats}
              </div>
              {replied == 200 ? (
                <>
                  <img height="20px" src="/bot.png" />
                  <i className="bi-check-all text-primary"></i>
                  <i>{timeStamps[index]}</i>
                  <div key={chats} id="reply-div">
                    {allReplies[index + 1]}
                  </div>
                </>
              ) : (
                <p className="text-end">Typing...</p>
              )}{" "}
            </>
          );
        })}
      </div>
      <div className="input-group" id="message-group">
        <input
          type="text"
          className="form-control"
          id="text-input"
          placeholder="your message goes in here"
          onChange={(e) =>
            e.target.value.length != 0 ? setBtn("block") : setBtn("none")
          }
        />
        <span
          className="input-group-text bi-telegram text-primary"
          style={{display: hideSendBtn}}
          onClick={onChange}
        ></span>
      </div>
    </main>
  );
}
