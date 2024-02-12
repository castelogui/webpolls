export default () => {
  const sessionId = useCookie("sessionId");
  let pollsList = [];
  const api = "https://polls-xi-ten.vercel.app";
  const apiDev = "http://localhost:3333";
  const apiWsDev = "ws://localhost:3333";
  const apiWs = "ws://polls-xi-ten.vercel.app";
  const fetchPollList = async () => {
    const { data } = await useAsyncData(
      "polls",
      async () =>
        await $fetch(`${api}/polls`, {
          method: "GET",
          headers: {
            getSetCookie: sessionId.value,
          },
        })
    );
    if (data.value) {
      data.value.map(async (poll) => {
        pollsList.push(poll);
        const ws = new WebSocket(`${apiWs}/polls/${poll.id}/results`);
        ws.onopen = () => {
          console.log("Ws connection");
        };
        ws.onmessage = (message) => {
          const pollOption = JSON.parse(message.data);
          pollsList.map((poll) => {
            poll.options.map((option) => {
              if (option.id == pollOption.pollOptionId) {
                option.score = pollOption.votes;
              }
            });
          });
        };
      });
    }
    return pollsList;
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
    const { data } = await useAsyncData(
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
          },
        })
    );
  };

  const votePoll = async (pollId, pollOptionId) => {
    const dataVote = await $fetch(`${api}/polls/${pollId}/votes`, {
      method: "POST",
      body: {
        pollOptionId: pollOptionId,
      },
      headers: {
        getSetCookie: sessionId.value,
      },
    });
    console.log(dataVote);
  };

  const deletePoll = async (id) => {
    const { data, error, execute, pending, refresh, status } =
      await useAsyncData(
        "poll",
        async () =>
          await $fetch(`${api}/polls/${id}`, {
            method: "DELETE",

            headers: {
              getSetCookie: sessionId.value,
            },
          })
      );
  };

  const getPoll = async (id) => {
    try {
      const data = await $fetch(`${api}/polls/${id}`, {
        method: "GET",
        headers: {},
      });
      return data.poll;
    } catch (error) {
      console.log(error);
      return false;
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
  };
};
