<template>
  <div class="spy-rules-page">
    <div class="spy-rules-page-header">Spy<span class="highlight">Game</span>
      <span class="spy-rules-page-header-reset"> Rules</span>
    </div>
    <transition-group name="rules-list">
      <RulesItem v-for="rule in rulesList" :rule="rule" :key="rule.id"/>
    </transition-group>
  </div>
</template>

<script>
export default {name: 'RulesPage'}
</script>

<script setup>
import RulesItem from '@/components/RulesItem.vue';

const rulesList = [
  {
    id: 0,
    header: 'Context',
    body: ['You are a detective in the investigation bureau. Someone among all detectives is a Spy, but you don`t know' +
    ' who exactly. All detectives, including you, were brought to one room to investigate who is a spy among them']
  },
  {
    id: 1,
    header: 'Requirements',
    body: ['4-16 people', 'All in the same room or call', 'Any device with a connection to the internet']
  },
  {
    id: 2,
    header: 'Objectives',
    body: ['Spy: Guess the location and don`t expose yourself', 'Detectives: Find the Spy before the timer goes off']
  },
  {
    id: 2,
    header: 'Information',
    body: ['Duration: 5-20 minutes/Until guess (Configurable)', 'Locations Collection: Set of every location featured' +
    ' as Round Location. Shown to everyone under the Round Location', 'Round Location: A Location card is shown on ' +
    'the screen of every detective, a Spy sees a Spy card', 'Participants: All players are on the list, you can ' +
    'write short notes on each other, or suspect someone is being a Spy']
  },
  {
    id: 2,
    header: 'Gameplay',
    body: ['When the game starts everyone except a Spy sees a Location card. The game highlights a random player ' +
    'for 10 seconds after the start, this player should ask the first question to the next player on list. When ' +
    'the first question is asked, the player who answered it, questions the next player, and so on, until the ' +
    'first player answers a question. After a full circle, players can ask anyone a question except the person who ' +
    'asked them', 'Any player can suspect others at any time, but this action is limited to a certain number ' +
    '(4-7 people – 1, 7-12 people – 2, 12-16 people – 3). If the majority votes for suspected, a player gets kicked ' +
    'from a game, if he is not a Spy, the game continues', 'Spy can guess a location at any time by pressing the ' +
    'guess button, if he fails to guess — he loses', 'The game ends with Detectives winning when the Spy gets kicked ' +
    'or guesses the wrong location. The spy wins if guesses the location or the timer goes off']
  },
  {
    id: 2,
    header: 'Points',
    body: ['Detectives, who weren`t kicked get 2 points each for a win', 'The detective, who suspected a Spy and ' +
    'after that the Spy was kicked, gets 2 additional points', 'The spy gets 4 points for location guess', 'The ' +
    'spy gets 2 points if the timer goes off']
  }
];
</script>

<style scoped lang="scss">
@use '@/assets/scss/style';

.spy-rules-page {
  display: flex;
  flex-direction: column;
  gap: .9rem;
  background: style.$background-color;
  padding: 5vh 10%;

  @include style.breakpoint(xs){
    padding: 5vh 5%;
  }

  @include style.breakpoint(m){
    padding: 5vh 7%;
  }

  @include style.breakpoint(xxl) {
    padding: 5vh 18%;
  }

  &-header {
    color: style.$text-color;
    font-family: style.$font-header;
    font-size: 1.4rem;
    text-align: center;

    &-reset {
      font-family: style.$font-body;
    }
  }
}
</style>