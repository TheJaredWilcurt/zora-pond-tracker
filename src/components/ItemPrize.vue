<template>
  <div class="prize-wrapper">
    <div
      v-if="showPrize"
      class="prize pixel-corners"
      :class="{ 'prize-dim': !valid }"
    >
      <span
        v-if="isRupee"
        class="prize-image"
      >
        <img
          alt="Rupees"
          :class="{
            dim: !valid,
            pointer: valid
          }"
          role="button"
          :src="'/zora-pond-tracker/sprites/' + version + '/rupee.gif'"
          tabindex="0"
          @click="acquire"
          @keydown.prevent.space="acquire"
          @keyup.enter="acquire"
        >
      </span>
      <span
        v-else
        class="prize-image"
      >
        <img
          :alt="titleCase(prize)"
          :class="{
            dim: !valid,
            pointer: valid
          }"
          role="button"
          :src="'/zora-pond-tracker/sprites/' + version + '/' + prize + '.png'"
          tabindex="0"
          @click="acquire"
          @keydown.prevent.space="acquire"
          @keyup.enter="acquire"
        >
        <span
          v-if="amount"
          class="prize-amount"
        >
          <img
            v-for="number in amountCharacters"
            :alt="number"
            :class="{ dim: !valid }"
            :src="'/zora-pond-tracker/sprites/' + version + '/' + number + '.png'"
          >
        </span>
      </span>
      <span class="offerings">
        <img
          :alt="titleCase(gemA + '-gem')"
          :class="{ dim: inventory.gems[gemA] < 1 }"
          :src="'/zora-pond-tracker/sprites/' + version + '/gem-' + gemA + '.png'"
        />
        <img
          :alt="titleCase(gemB + '-gem')"
          :class="secondGemStyles"
          :src="'/zora-pond-tracker/sprites/' + version + '/gem-' + gemB + '.png'"
        />
      </span>
      <span
        v-if="inventory.filters.showWorth"
        class="ruppee-worth"
        title="Equivalent value in ruppees (according to Zora)"
      >
        <img
          alt="Rupee"
          :src="'/zora-pond-tracker/sprites/' + version + '/rupee.gif'"
        />{{ rupeeWorth.min }}-{{ rupeeWorth.max }}
      </span>
    </div>
  </div>
</template>

<script>
import { titleCase } from '@/helpers/index.js';

export default {
  name: 'ItemPrize',
  props: [
    'gemA',
    'gemB',
    'prize',
    'inventory',
    'amount',
    'version'
  ],
  methods: {
    acquire: function () {
      if (!this.valid) {
        return;
      }
      const prize = this.prize;
      this.inventory.gems[this.gemA]--;
      this.inventory.gems[this.gemB]--;
      // wait until after gem subtraction to return if rupee
      if (this.isRupee) {
        return;
      }
      const itemEndsInNumber = '0123456789'.split('').includes(prize[prize.length - 1]);
      let itemWithoutNumber = prize;
      if (itemEndsInNumber) {
        itemWithoutNumber = prize.substring(0, prize.length - 1);
      }
      const prizeOnRoot = this.inventory.hasOwnProperty(itemWithoutNumber);
      const prizeOnBooleans = this.inventory.booleans.hasOwnProperty(itemWithoutNumber);
      // This is because "lamp" is different between versions
      if (this.version === '1.1.6') {
        if (prizeOnBooleans) {
          this.inventory.booleans[itemWithoutNumber] = true;
        } else if (prizeOnRoot) {
          this.inventory[itemWithoutNumber]++;
        }
      } else {
        if (prizeOnRoot) {
          this.inventory[itemWithoutNumber]++;
        } else if (prizeOnBooleans) {
          this.inventory.booleans[itemWithoutNumber] = true;
        }
      }
    },
    getGemValue: function (color) {
      const gemsOrderedByValue = {
        '1.1.6': [
          'pink',
          'purple',
          'yellow',
          'cyan',
          'green',
          'white',
          'red',
          'blue',
          'black'
        ],
        '1.2.0': [
          'pink',
          'orange',
          'cyan',
          'yellow',
          'purple',
          'green',
          'white',
          'red',
          'blue',
          'black'
        ]
      };
      return gemsOrderedByValue[this.version].indexOf(color) + 1;
    },
    titleCase
  },
  computed: {
    rupeeWorth: function () {
      const gemAValue = this.getGemValue(this.gemA);
      const gemBValue = this.getGemValue(this.gemB);
      const gemsValue = gemAValue * gemBValue;
      const minValue = Math.max(gemsValue, 25);
      const min = Math.round(minValue / 5) * 5;
      const max = Math.round((minValue * 3) / 5) * 5;
      return { min, max };
    },
    isRupee: function () {
      return (
        this.prize === 'rupee' ||
        this.prize === 'rupees' ||
        this.inventory.booleans[this.prize]
      );
    },
    showPrize: function () {
      const sameGem = this.gemA === this.gemB;
      const gem1Amount = this.inventory.gems[this.gemA];
      const gem2Amount = this.inventory.gems[this.gemB];
      const gem1Unobtainable = !sameGem && gem1Amount < 1;
      const gem2Unobtainable = !sameGem && gem2Amount < 1;
      const sameGemUnobtainable = sameGem && gem1Amount < 2;
      const unobtainable = gem1Unobtainable || gem2Unobtainable || sameGemUnobtainable;
      const obtainable = (
        (sameGem && gem1Amount > 1) ||
        (!sameGem && gem1Amount > 0 && gem2Amount > 0)
      );
      const gem1FilteredIn = this.inventory.filters.gems[this.gemA];
      const gem2FilteredIn = this.inventory.filters.gems[this.gemB];

      const hideRupees = this.isRupee && !this.inventory.filters.showRupees;
      const skipAntidote = (
        this.inventory.booleans['pendant-of-cures'] &&
        ['potion-pink', 'potion-purple'].includes(this.prize)
      );
      const skipUnobtainable = unobtainable && !this.inventory.filters.showUnavailable;
      const skipObtainable = obtainable && !this.inventory.filters.showAvailable;
      const gemsFilteredIn = gem1FilteredIn || gem2FilteredIn;

      if (
        hideRupees ||
        skipAntidote ||
        skipUnobtainable ||
        skipObtainable ||
        !gemsFilteredIn
      ) {
        return false;
      }

      return true;
    },
    valid: function () {
      const sameGem = this.gemA === this.gemB;
      const gem1Amount = this.inventory.gems[this.gemA];
      const gem2Amount = this.inventory.gems[this.gemB];

      const skipAntidote = (
        this.inventory.booleans['pendant-of-cures'] &&
        this.prize === 'potion-pink'
      );

      if (skipAntidote) {
        return false;
      }
      return (
        (
          sameGem &&
          gem1Amount > 1
        ) ||
        (
          !sameGem &&
          gem1Amount &&
          gem2Amount
        )
      );
    },
    amountCharacters: function () {
      if (this.amount !== undefined) {
        return (this.amount + '').split('');
      }
      return undefined;
    },
    secondGemStyles: function () {
      const sameGem = this.gemA === this.gemB;
      const gem2Amount = this.inventory.gems[this.gemB];
      if (sameGem && gem2Amount < 2) {
        return 'dim';
      } else if (gem2Amount < 1) {
        return 'dim';
      }
      return undefined;
    }
  }
}
</script>
