export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

/**
 * The function checks if the sender of a message is the same as the sender of the next message in an
 * array, and if the sender is not the user's ID.
 * @param messages - an array of message objects
 * @param m - The current message object being compared to the next message object in the array.
 * @param i - The index of the current message in the `messages` array.
 * @param userId - The ID of the user who is currently logged in or using the messaging system.
 * @returns The function `isSameSender` takes in four parameters: `messages`, `m`, `i`, and `userId`.
 * It returns a boolean value that is `true` if the following conditions are met:
 */
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

//returns just user name
export const getSender = (loggedUser, users) => {
  /* This function is determining the name of the sender of a message based on the logged in user and the
users involved in the conversation. It checks if the ID of the first user in the conversation
matches the ID of the logged in user, and if so, returns the name of the second user in the
conversation. If not, it returns the name of the first user in the conversation. */
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

//returns complete user object
export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
