import axios from "axios";

function getToken() {
  const clientId = "5gyzukrmrim5q8yr1v7xgvo0dohd4x";
  const redirectUri = "http://localhost:5173";
  const state = "c3ab8aa609ea11e793ae92361f002671";

  const scope = [
    "analytics:read:extensions",
    "analytics:read:games",
    "bits:read",
    "channel:edit:commercial",
    "channel:manage:broadcast",
    "channel:manage:extensions",
    "channel:manage:redemptions",
    "channel:manage:videos",
    "channel:moderate",
    "channel:read:editors",
    "channel:read:hype_train",
    "channel:read:redemptions",
    "channel:read:subscriptions",
    "clips:edit",
    "moderation:read",
    "user:edit",
    "user:edit:broadcast",
    "user:edit:follows",
    "user:read:broadcast",
    "user:read:email",
    "channel:read:polls",
    "channel:read:predictions",
    "channel:read:stream_key",
    "channel:read:subscriptions",
    "user:read:blocked_users",
    "user:manage:blocked_users",
    "user:read:subscriptions",
    "user:read:follows",
    "openid",
  ];

  const scopeString = encodeURIComponent(scope.join("+"));
  const url = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopeString}&state=${state}`;
  const response = axios.get(url);
  console.log(response);
}

export default {
  getToken,
};
