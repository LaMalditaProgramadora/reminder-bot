export const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
};

export const getReponse = (username, message) => {
  return {
    content: username + message,
    ephemeral: true,
  };
};

export const getReponseEmbed = (embed) => {
  return {
    embeds: [embed],
    ephemeral: true,
  };
};