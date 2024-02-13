export default () => {
  const sessionId = useCookie("sessionId");

  //const apiWs_ = "ws://polls-xi-ten.vercel.app";
  //const api_ = "https://polls-xi-ten.vercel.app";

  const api = "http://localhost:3333";
  const apiWs = "ws://localhost:3333";

  const pollsList = () => useState("polls_list", () => []);
  const pollsState = () => useState("polls_state", () => {});

  const fetchPollList = async () => {
    const { data } = await useAsyncData(
      "polls",
      async () =>
        await $fetch(`${api}/polls`, {
          method: "GET",
          headers: {
            getSetCookie: sessionId.value,
            "Content-Type": "application/json",
          },
        })
    );
    let list = [];
    if (data.value) {
      data.value.map(async (poll) => {
        list.push(poll);
        list.map(async (poll) => {
          poll = await connectionWebSocket(poll);
        });
      });
    }
    list.map((poll) => {
      pollsList().value = pollsList().value.filter((p) => p.id !== poll.id);
      pollsList().value.push(poll);
    });
  };

  const connectionWebSocket = async (poll) => {
    const ws = new WebSocket(`${apiWs}/polls/${poll.id}/results`);
    ws.onopen = () => {
      console.log("Ws connection");
    };
    ws.onmessage = (message) => {
      const pollOption = JSON.parse(message.data);
      poll.options.map((option) => {
        option.id == pollOption.pollOptionId
          ? (option.score = pollOption.votes)
          : false;
      });
    };
    return poll;
  };

  const createPoll = async ({ title, options }) => {
    try {
      const data = await $fetch(`${api}/polls`, {
        method: "POST",
        body: {
          title: title,
          options: options.title.split(";").map((value) => value.trim()),
        },
        headers: {
          getSetCookie: sessionId.value,
          "Content-Type": "application/json",
        },
      });
      if (!sessionId.value && data?.sessionId) {
        sessionId.value = data.sessionId;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePoll = async (id, poll) => {
    await useAsyncData(
      "poll",
      async () =>
        await $fetch(`${api}/polls/${id}`, {
          method: "PATCH",
          body: {
            title: poll.title,
            options: poll.options,
          },
          headers: {
            getSetCookie: sessionId.value,
            "Content-Type": "application/json",
          },
        })
    );
  };

  const votePoll = async (pollId, pollOptionId) => {
    try {
      await $fetch(`${api}/polls/${pollId}/votes`, {
        method: "POST",
        body: {
          pollOptionId: pollOptionId,
        },
        headers: {
          getSetCookie: sessionId.value,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePoll = async (id) => {
    await $fetch(`${api}/polls/${id}`, {
      method: "DELETE",
      headers: {
        getSetCookie: sessionId.value,
        "Content-Type": "application/json",
      },
    });
    pollsList().value = pollsList().value.filter((poll) => poll.id !== id);
  };

  const getPoll = async (id) => {
    try {
      const data = await $fetch(`${api}/polls/${id}`, {
        method: "GET",
      });
      pollsState().value = await connectionWebSocket(data.poll);
      return pollsState().value;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchPollList,
    createPoll,
    updatePoll,
    deletePoll,
    getPoll,
    votePoll,
    pollsList,
    pollsState,
  };
};
