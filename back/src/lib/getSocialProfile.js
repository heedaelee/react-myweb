import FacebookAPI from "fb";

const profileGetter = {
  facebook(accessToken) {
    return FacebookAPI.api("me", {
      fields: ["name", "email", "picture"],
      access_token: accessToken,
    }).then(auth => {
      return {
        id: auth.id,
        name: auth.name,
        email: auth.email || null,
        thumbnail: auth.picture.data.url
      };
    });
  }
};

export default function getSoicalProfile(provider, accessToken) {
  return profileGetter[provider](accessToken);
}
