// ----------------------------------------------------------------------

export function getMessage({ message, participants, currentUserId }) {
  const sender = participants.find((participant) => participant.id === message.senderId);

  const isCurrentUser = message.senderId === currentUserId;

  const senderDetails = isCurrentUser
    ? { type: 'me' }
    : { avatarUrl: sender?.avatarUrl, firstName: sender?.name?.split(' ')[0] ?? 'Unknown' };

  const hasImage = message.contentType === 'image';

  return { hasImage, me: isCurrentUser, senderDetails };
}
