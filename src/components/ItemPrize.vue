<template>
  <div class="prize-wrapper">
    <div
      v-if="showPrize"
      class="prize pixel-corners"
      :class="{ 'prize-dim': !valid }"
    >
      <span v-if="isRupee">
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
      const itemEndsInNumber = '0123456789'.split('').includes(prize[prize.length - 1]);
      let itemWithoutNumber = prize;
      if (itemEndsInNumber) {
        itemWithoutNumber = prize.substring(0, prize.length - 1);
      }
      if (this.isRupee) {
        return;
      } else if (this.inventory.booleans.hasOwnProperty(itemWithoutNumber)) {
        this.inventory.booleans[itemWithoutNumber] = true;
      } else if (this.inventory.hasOwnProperty(itemWithoutNumber)) {
        this.inventory[itemWithoutNumber]++;
      }
    },
    titleCase
  },
  computed: {
    isRupee: function () {
      return (
        this.prize === 'rupee' ||
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
      const gem1FilteredOut = !this.inventory.filters.gems[this.gemA];
      const gem2FilteredOut = !this.inventory.filters.gems[this.gemB];

      const hideRupees = this.isRupee && !this.inventory.filters.showRupees;
      const skipAntidote = (
        this.inventory.booleans['pendant-of-cures'] &&
        this.prize === 'potion-pink'
      );
      const skipUnobtainable = unobtainable && !this.inventory.filters.showUnavailable;
      const skipObtainable = obtainable && !this.inventory.filters.showAvailable;
      const gemsFilteredOut = gem1FilteredOut || gem2FilteredOut;

      if (
        hideRupees ||
        skipAntidote ||
        skipUnobtainable ||
        skipObtainable ||
        gemsFilteredOut
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
