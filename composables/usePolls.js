export default () => {
  const fetchPollList = async () => {
    let polls = [];
    const { data } = await useAsyncData(
      "polls",
      async () => await $fetch("http://localhost:3333/polls")
    );
    data.value.map(async (poll) => {
      polls.push(poll);
      const ws = new WebSocket(`ws://localhost:3333/polls/${poll.id}/results`);
      ws.onopen = () => {
        console.log("Ws connection");
      };
      ws.onmessage = (message) => {
        const pollOption = JSON.parse(message.data);
        polls.map((poll) => {
          poll.options.map((option) => {
            if (option.id == pollOption.pollOptionId) {
              option.score = pollOption.votes;
            }
          });
        });
      };
    });
    return polls;
  };

  const createPoll = async ({ title, options }) => {
    await $fetch("http://localhost:3333/polls", {
      method: "POST",
      body: {
        title: title,
        options: options.title.split(",").map((value) => value.trim()),
      },
    });
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
    console.log(pollId, pollOptionId);
    const { data } = await useAsyncData(
      "poll",
      async () =>
        await $fetch(`http://localhost:3333/polls/${pollId}/votes`, {
          method: "POST",
          body: {
            pollOptionId: pollOptionId,
          },
        })
    );
    console.log(data);
  };

  const deletePoll = async (id) => {
    await $fetch(`http://localhost:3333/polls/${id}`, {
      method: "DELETE",
    });
  };

  const getPoll = async (id) => {
    const { data } = await useAsyncData(
      "poll",
      async () => await $fetch(`http://localhost:3333/polls/${id}`)
    );
    return data.value.poll;
  };

  return {
    fetchPollList,
    createPoll,
    updatePoll,
    deletePoll,
    getPoll,
    votePoll,
  };
};
