<p>&nbsp;</p>
<p align="center"><img src="https://s3.amazonaws.com//apptitude.io/goalie/logo.png" width="30%"/></p>

<h2 align="center">⚽️ Realtime football results.</h2>

## Table of Contents

-   [Getting Started](#getting-started)
-   [Running the Application](#running-the-application)
-   [Running Tests](#running-tests)
-   [Design Document](#design-document)

## Getting Started

First, unzip the Goalie source code file to the directory of your choice, then enter that directory in the terminal of your choice.

In this example, we've unzipped Goalie into a folder on our desktop called **goalie**:

```
cd ~/Desktop/goalie
```

Next, install dependencies using [`npm`](https://www.npmjs.com/):

```bash
npm install
```

## Running the application

### File Input

Get started with Goalie on the command line by doing a test run using the provided `input.txt` sample file:

```javascript
npm run goalie samples/input.txt
```

You should see the input provided by the file, followed by the leaderboard for each matchday once the day is deemed complete.

A leaderboard looks like this:

```javascript
Matchday 1
Capitola Seahorses, 3 pts
Felton Lumberjacks, 3 pts
San Jose Earthquakes, 1 pts
```

Any time you'd like to use Goalie with an input file, just use the file path as the first argument for the command:

```
npm run goalie path/to/my/awesome/file.txt
```

### Direct Input

Next, run goalie using stdin for input by simply using the 'goalie' command with no arguments:

```
npm run goalie
```

Enter match results one-per-line like so:

```
San Jose Earthquakes 3, Santa Cruz Slugs 3
```

The input match result format should be:

```
Team1 Score1, Team2 Score2
```

Once you have entered a match result, hit return, and Goalie will process the line.

If enough results have been entered to determine that a matchday is complete, Goalie will output a leaderboard for the matchday automatically.

**You just started tracking football match results in realtime with Goalie. It's time for a pint! 🍻**

## Running Tests

Goalie uses the excellent [Jest](https://jestjs.io) testing framework for tests.

To run Goalie's tests, simply run the following command:

```
npm test
```

## Design Document

-   See the [System Design Document](https://apptitude.notion.site/Goalie-System-Design-Document-bebb57cbbbe649f8a9ae6cff37c33694) on Notion for further details.

## License

Goalie is [MIT licensed](./LICENSE). Enjoy!
