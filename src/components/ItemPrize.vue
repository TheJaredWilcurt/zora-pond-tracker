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
          src="/zora-pond-tracker/sprites/1.1.6/rupee.gif"
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
          :src="'/zora-pond-tracker/sprites/1.1.6/' + prize + '.png'"
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
            :src="'/zora-pond-tracker/sprites/1.1.6/' + number + '.png'"
          >
        </span>
      </span>
      <span class="offerings">
        <img
          :alt="titleCase(gemA + '-gem')"
          :class="{ dim: inventory.gems[gemA] < 1 }"
          :src="'/zora-pond-tracker/sprites/1.1.6/gem-' + gemA + '.png'"
        />
        <img
          :alt="titleCase(gemB + '-gem')"
          :class="secondGemStyles"
          :src="'/zora-pond-tracker/sprites/1.1.6/gem-' + gemB + '.png'"
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
    'amount'
  ],
  methods: {
    acquire: function () {
      if (!this.valid) {
        return;
      }
      let gem1 = this.gemA;
      let gem2 = this.gemB;
      let item = this.prize;
      let inventory = this.inventory;
      inventory.gems[gem1]--;
      inventory.gems[gem2]--;
      let itemEndsInNumber = '0123456789'.split('').includes(item[item.length - 1]);
      let itemWithoutNumber = item;
      if (itemEndsInNumber) {
        itemWithoutNumber = item.substring(0, item.length - 1);
      }
      if (this.isRupee) {
        return;
      } else if (inventory.booleans.hasOwnProperty(itemWithoutNumber)) {
        inventory.booleans[itemWithoutNumber] = true;
      } else if (inventory.hasOwnProperty(itemWithoutNumber)) {
        inventory[itemWithoutNumber]++;
      }
    },
    titleCase
  },
  computed: {
    isRupee: function () {
      const item = this.prize;
      const inventory = this.inventory;
      return (
        item === 'rupee' ||
        inventory.booleans[item]
      );
    },
    showPrize: function () {
      let gem1 = this.gemA;
      let gem2 = this.gemB;
      let item = this.prize;
      let inventory = this.inventory;
      const amount = this.amount;
      const sameGem = gem1 === gem2;
      const gem1Amount = inventory.gems[gem1];
      const gem2Amount = inventory.gems[gem2];
      const gem1Unobtainable = !sameGem && gem1Amount < 1;
      const gem2Unobtainable = !sameGem && gem2Amount < 1;
      const sameGemUnobtainable = sameGem && gem1Amount < 2;
      const unobtainable = gem1Unobtainable || gem2Unobtainable || sameGemUnobtainable;
      const obtainable = (
        (sameGem && gem1Amount > 1) ||
        (!sameGem && gem1Amount > 0 && gem2Amount > 0)
      );
      const gem1FilteredOut = !inventory.filters.gems[gem1];
      const gem2FilteredOut = !inventory.filters.gems[gem2];

      const hideRupees = this.isRupee && !inventory.filters.showRupees;
      const skipAntidote = (
        inventory.booleans['pendant-of-cures'] &&
        item === 'potion-pink'
      );
      const skipUnobtainable = unobtainable && !inventory.filters.showUnavailable;
      const skipObtainable = obtainable && !inventory.filters.showAvailable;
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
      let gem1 = this.gemA;
      let gem2 = this.gemB;
      let item = this.prize;
      let inventory = this.inventory;
      const amount = this.amount;
      const sameGem = gem1 === gem2;
      const gem1Amount = inventory.gems[gem1];
      const gem2Amount = inventory.gems[gem2];

      const skipAntidote = (
        inventory.booleans['pendant-of-cures'] &&
        item === 'potion-pink'
      );

      if (skipAntidote) {
        return false;
      }

      if (sameGem) {
        if (gem1Amount > 1) {
          return true;
        }
      } else if (gem1Amount && gem2Amount) {
        return true
      }
      return false;
    },
    amountCharacters: function () {
      if (this.amount !== undefined) {
        return (this.amount + '').split('');
      }
      return undefined;
    },
    secondGemStyles: function () {
      let gem1 = this.gemA;
      let gem2 = this.gemB;
      let inventory = this.inventory;
      const sameGem = gem1 === gem2;
      const gem2Amount = inventory.gems[gem2];
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
