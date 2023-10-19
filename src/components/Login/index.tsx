import { useAtomValue, useSetAtom } from "jotai";
import { nip19 } from "nostr-tools";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";

import { loginKeyAtom } from "src/state/User";

type Props = {};

const LoginForm = (props: Props) => {
  const [userKey, setUserKey] = useState("");
  const [valid, setValid] = useState<boolean>(true);
  const [hidePass, setHidePass] = useState<boolean>(true);
  const setLoginKey = useSetAtom(loginKeyAtom);
  const loginKey = useAtomValue(loginKeyAtom);

  const handleLogin = async () => {
    const isNsec = userKey.startsWith("nsec");
    if (isNsec) {
      try {
        nip19.decode(userKey);
      } catch {
        setValid(false);
        return;
      }
    } else {
      try {
        nip19.nsecEncode(userKey);
      } catch {
        setValid(false);
        return;
      }
    }

    setValid(true);
    setLoginKey(userKey);
  };

  const handleRegister = async () => {};

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputField}>
        <TextInput
          label="Secret key"
          placeholderTextColor="#444"
          placeholder="Secret Key (hex or nsec)"
          autoCapitalize="none"
          textContentType="password"
          value={userKey}
          autoCorrect={false}
          secureTextEntry={hidePass}
          onChangeText={(text) => setUserKey(text)}
          mode="outlined"
          error={userKey.length < 10 || !valid}
          right={
            <TextInput.Icon
              icon={hidePass ? "eye" : "eye-off"}
              onPress={() => setHidePass(!hidePass)}
            />
          }
        />
        {!valid && <Text>Invalid key.</Text>}
      </View>

      <Button
        style={styles.button}
        onPress={handleLogin}
        // disabled={userKey.length < 10 || !valid}
        mode="outlined"
      >
        <Text style={styles.buttonText}>Log In</Text>
      </Button>

      <View style={styles.signupContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => handleRegister()}>
          <Text style={{ color: "#6bb0f5" }}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    marginBottom: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 50,
    justifyContent: "center",
  },
});
