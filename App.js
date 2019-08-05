import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { facebookLogin } from "./auth";

export default class App extends Component {
  state = {
    error: null,
    loading: false,
    user: null
  };

  handleLoginWithFacebook = async () => {
    const response = await facebookLogin();

    if (response.error) {
      this.setState({ error: response.error, loading: false });
      return false;
    }

    this.setState({ user: response.user, loading: false, error: "" });
  };

  handleLogout = () => {
    this.setState({ user: null });
  };

  render() {
    const { error, user } = this.state;
    return (
      <View style={styles.container}>
        {!!error && <Text>{error}</Text>}
        <Text style={styles.label}>React Native Facebook SDK</Text>

        {user ? (
          <View style={styles.userContainer}>
            <Image
              source={{ uri: user.picture.data.url }}
              style={styles.avatar}
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleLogout}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={this.handleLoginWithFacebook}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Entrar com o Facebook</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  label: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 48
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 5,
    height: 30,
    borderRadius: 4,
    backgroundColor: "#4267B2",
    justifyContent: "center",
    width: 180
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  userContainer: {
    borderRadius: 4,
    padding: 10,
    width: 200,
    backgroundColor: "white",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#4267B2",
    alignSelf: "stretch",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: "#4267b2",
    borderWidth: 1
  },
  email: {
    fontSize: 14,
    color: "lightgrey",
    fontWeight: "normal",
    alignSelf: "stretch",
  }
});
