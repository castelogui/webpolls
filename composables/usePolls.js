export default () => {
  let pollsList = [];
  const fetchPollList = async () => {
    const { data } = await useAsyncData(
      "polls",
      async () => await $fetch("http://localhost:3333/polls")
    );
    if (data.value) {
      data.value.map(async (poll) => {
        pollsList.push(poll);
        const ws = new WebSocket(
          `ws://localhost:3333/polls/${poll.id}/results`
        );
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
      const data = await $fetch("http://localhost:3333/polls", {
        method: "POST",
        body: {
          title: title,
          options: options.title.split(",").map((value) => value.trim()),
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePoll = async (id, poll) => {
    const { data } = await useAsyncData(
      "poll",
      async () =>
        await $fetch(`http://localhost:3333/polls/${id}`, {
          method: "PATCH",
          body: {
            title: poll.title,
            options: poll.options,
          },
        })
    );
  };

  const votePoll = async (pollId, pollOptionId) => {
    const dataVote = await $fetch(
      `http://localhost:3333/polls/${pollId}/votes`,
      {
        method: "POST",
        body: {
          pollOptionId: pollOptionId,
        },
      }
    );
  };

  const deletePoll = async (id) => {
    const { data, error, execute, pending, refresh, status } =
      await useAsyncData(
        "poll",
        async () =>
          await $fetch(`http://localhost:3333/polls/${id}`, {
            method: "DELETE",
          })
      );
  };

  const getPoll = async (id) => {
    const data = await $fetch(`http://localhost:3333/polls/${id}`);
    return data.poll;
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
