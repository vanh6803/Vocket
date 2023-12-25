# Vocket

## Project Description

Vocket is a social application inspired by the Locket app. This project is developed to provide a seamless communication experience between the iOS and Android operating systems. Vocket is not only a platform to connect with friends, send messages, and express preferences, but it also aims to support video recording and viewing in the future.

## Project Goals

The main goal of the project is to address the inconsistency issue between the Locket app on two different operating systems. Vocket will offer a unified interface and extended features, including video recording and viewing, to enhance the user experience.

## Installation

### Step 1: Clone the Project

```bash
git clone https://github.com/vanh6803/Vocket.git
```

Note: Clone the Backend. Before proceeding, make sure to clone the backend of this project from [here](https://github.com/vanh6803/backend_vocket.git).

### Step 2: Install Dependencies

```bash
cd Vocket
yarn
```

### Step 2: Modify Gradle File

Open the `node_modules/react-native-image-manipulator/android/build.gradle` file and modify the following values:

```bash
compileSdkVersion 30
targetSdkVersion 30
minSdkVersion 21
```

### Step 4: Run the Application

#### Android

```bash
yarn android
```

#### IOS

```bash
yarn ios
```

#### Or

```bash
yarn start
```

## Contribution

I welcome contributions and feedback from the community. If you have any ideas, please open an issue or submit a pull request.

## Contact

If you have any questions or suggestions, please contact me via email: anhnv6083@gmail.com.
