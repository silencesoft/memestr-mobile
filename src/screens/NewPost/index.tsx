import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAtomValue } from "jotai";
import * as mime from "mime";
import {
  Event as NostrEvent,
  finishEvent,
  getEventHash,
  signEvent,
  verifySignature,
} from "nostr-tools";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  TextInput,
  Checkbox,
  ActivityIndicator,
  Snackbar,
  Text,
  Button,
} from "react-native-paper";

import { RootStackParamList } from "src/constants/RootStackParamList";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { saveMedia } from "src/services/saveMedia";
import { dateToUnix } from "src/utils/dateToUnix";
import { privKeyAtom, pubKeyAtom } from "src/state/User";
import sendPost from "src/services/sendPost";
import { defaultRelays, defaultTags } from "src/constants/defaultValues";
import { homeScreenProp } from "src/interfaces/navigation/props";

interface Props extends NativeStackScreenProps<RootStackParamList, "NewPost"> {}

const NewPostScreen = ({ route }: Props) => {
  const { id, name, source, type } = route?.params;
  const navigation = useNavigation<homeScreenProp>();
  const privkey = useAtomValue(privKeyAtom);
  const pubkey = useAtomValue(pubKeyAtom);
  const [error, setError] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const [externalSource, setExternalSource] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [checked, setChecked] = useState(false);
  const relays = defaultRelays;

  const handleSavePost = async () => {
    let image = "";
    setRequestRunning(true);

    if (source) {
      const url = await saveMedia(source);
      image = url;
    } else {
      image = externalSource;
    }

    if (!image) {
      setRequestRunning(false);
      return;
    }

    const now = new Date();
    const tagsList = tags.split(",");
    const date = dateToUnix(now);
    let content = `${image}\n\n${description}`;

    if (!checked) {
      defaultTags.forEach((tag) => tagsList.push(tag));
    }

    const event: NostrEvent = {
      content: content,
      kind: 1,
      created_at: date,
      pubkey: pubkey || "",
      id: "",
      sig: "",
      tags: [["published_at", date.toString()]],
    };

    tagsList
      .reduce(
        (tags: string[], tag) => (tags.includes(tag) ? tags : [...tags, tag]),
        []
      )
      .forEach((tag: string) => {
        event.tags.push(["t", tag.trim()]);
      });

    const type = source?.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)?.[0];

    event.tags.push(["r", image, type || ""]);

    const profiles = content.match(/@npub\w+/gi);

    const newTags: any = [];

    profiles?.forEach((profile) => {
      const user = profile.replace("@", "");

      content = content.replace(profile, `nostr:${user}`);
    });

    if (profiles?.length) {
      event.content = content;
      event.tags = [...event.tags, ...newTags];
    }

    try {
      event.id = getEventHash(event);

      const signedEvent = finishEvent(event, privkey);

      await sendPost({ relays, newEvent: signedEvent });

      navigation.navigate('Home');

      setRequestRunning(false);
    } catch (e) {
      console.log({ e });
      setRequestRunning(false);
      // setError('title', { message: 'Error in server or event signature' });
    }
  };

  const onDismissSnackBar = () => setError("");

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {!source && (
          <View style={styles.formContainer}>
            <TextInput
              mode="outlined"
              style={styles.inputText}
              maxLength={250}
              multiline
              onChangeText={(text) => setExternalSource(text)}
              placeholder="External Source"
              label="External Source"
              value={externalSource}
            />
          </View>
        )}
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            style={styles.inputText}
            maxLength={250}
            multiline
            numberOfLines={3}
            onChangeText={(text) => setDescription(text)}
            placeholder="Describe your image"
            label="Description"
            value={description}
          />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            mode="outlined"
            style={styles.inputText}
            onChangeText={(text) => setTags(text)}
            placeholder="Tags, comma separated"
            label="Tags"
            value={tags}
          />
        </View>
        <View>
          <Checkbox.Item
            label="Do not use memestr default tags."
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
        <View style={styles.formContainer}>
          {!!source || !!externalSource ? (
            <Image
              style={styles.mediaPreview}
              source={{
                uri: source || externalSource,
              }}
            />
          ) : (
            <View style={styles.mediaPreview} />
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            onPress={() => navigation.goBack()}
            mode="outlined"
            icon="cancel"
          >
            Cancel
          </Button>

          <Button
            onPress={() => handleSavePost()}
            mode="contained"
            icon="upload"
            style={styles.button}
          >
            Post
          </Button>
        </View>
        {!!error && (
          <Snackbar
            visible={!!error}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Undo",
              onPress: () => {
                // Do something
              },
            }}
          >
            {error}
          </Snackbar>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
  uploadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    // flex: 1,
  },
  formContainer: {
    marginBottom: 20,
    // flexDirection: "row",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  inputText: {
    // width: "100%",
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    // backgroundColor: "black",
    width: 200,
    height: 355,
    // marginTop: 0,
    // marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    flex: 1,
  },
});
