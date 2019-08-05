import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";

const getAccountInfo = accessData =>
  new Promise((resolve, reject) => {
    new GraphRequestManager()
      .addRequest(
        new GraphRequest(
          "/me",
          {
            accessToken: accessData.accessToken,
            parameters: {
              fields: {
                string: "id, name, email, picture.type(large)",
              }
            }
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            return resolve(result);
          }
        )
      )
      .start();
  });

export const facebookLogin = async () => {
  let result;

  try {
    result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      return { error: "Usuario cancelou o Login!" };
    }

    const accessData = await AccessToken.getCurrentAccessToken();

    const info = await getAccountInfo(accessData);

    return { user: info };
  } catch (err) {
    throw new Error(err);
  }
};
