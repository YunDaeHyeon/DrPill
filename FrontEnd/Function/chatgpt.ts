import Config from 'react-native-config';

// gpt-3.5 터보 모델 호출
export const callChatGPT = question => {
  const data = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: ''},
      {role: 'user', content: question},
    ],
  });

  return fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + Config.DRPILL_CHATGPT,
    },
    body: data,
  }).then(response => response.json());
};
