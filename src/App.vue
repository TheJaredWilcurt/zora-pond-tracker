<template>
  <div>
    <header>
      <h1>
        Zora Pond<br>
        Item Tracker
      </h1>
      <h2>
        For Dungeons of Infinity
        <span class="select-wrapper">
          <select v-model="version" class="pixel-corners">
            <option version="1.2.0">1.2.0</option>
            <option version="1.1.6">1.1.6</option>
          </select>
        </span>
      </h2>
    </header>

    <h3>Your Inventory:</h3>
    <section>
      <InventoryItem
        v-for="(gemAmount, gemColor) in inventory.gems"
        v-model="inventory.gems[gemColor]"
        :alt="gemColor + ' colored gem'"
        :src="'/zora-pond-tracker/sprites/1.1.6/gem-' + gemColor + '.png'"
        :key="gemColor"
      ></InventoryItem>
      <InventoryItem v-model="inventory.bag"    alt="Bag"    :min="1" :max="3"></InventoryItem>
      <InventoryItem v-model="inventory.tunic"  alt="Tunic"  :min="1" :max="4"></InventoryItem>
      <InventoryItem v-model="inventory.sword"  alt="Sword"           :max="6"></InventoryItem>
      <InventoryItem v-model="inventory.shield" alt="Shield"          :max="4"></InventoryItem>
      <InventoryItem v-model="inventory.gloves" alt="Gloves"          :max="3"></InventoryItem>
      <InventoryItem v-model="inventory.bow"    alt="Bow"             :max="2"></InventoryItem>

      <div>
        <span
          v-for="(bool, item) in inventory.booleans"
          class="sub-item-wrapper"
          :key="'booleans-' + item"
        >
          <img
            :alt="titleCase(item)"
            class="sub-item pixel-corners pointer"
            :data-selected="bool"
            role="button"
            tabindex="0"
            :src="'/zora-pond-tracker/sprites/1.1.6/' + item + '.png'"
            @click="inventory.booleans[item] = !inventory.booleans[item]"
            @keydown.prevent.space="inventory.booleans[item] = !inventory.booleans[item]"
            @keyup.prevent.enter="inventory.booleans[item] = !inventory.booleans[item]"
          />
        </span>
      </div>
    </section>

    <h3>Possible Rewards</h3>
    <section>
      <div class="filters">
        <CheckBox v-model="inventory.filters.showAvailable">Show Available</CheckBox>
        <CheckBox v-model="inventory.filters.showUnavailable">Show Unavailable</CheckBox>
        <CheckBox v-model="inventory.filters.showRupees">Show Rupees</CheckBox>
        <span
          v-for="(bool, item) in inventory.filters.gems"
          class="sub-item-wrapper"
          :key="'sub-item-' + item"
        >
          <img
            :alt="titleCase(item + '-gem')"
            class="sub-item small pixel-corners pointer"
            :data-selected="bool"
            role="button"
            tabindex="0"
            :src="'/zora-pond-tracker/sprites/1.1.6/gem-' + item + '.png'"
            @click="inventory.filters.gems[item] = !inventory.filters.gems[item]"
            @keydown.prevent.space="inventory.filters.gems[item] = !inventory.filters.gems[item]"
            @keyup.prevent.enter="inventory.filters.gems[item] = !inventory.filters.gems[item]"
          />
        </span>
      </div>
      <ItemPrize
        v-for="gemCombo in prizePool"
        :inventory="inventory"
        :a="gemCombo.itemA"
        :b="gemCombo.itemB"
        :i="gemCombo.prize"
        :n="gemCombo.amount"
      />
    </section>

    <h3>Dwarven Maze</h3>
    <section>
      <a
        href="/zora-pond-tracker/dwarven-maze.jpg"
        target="_blank"
        style="display: inline-block;"
      >
        <img
          alt="Dwarven Maze Map"
          class="maze pixel-corners"
          src="/zora-pond-tracker/dwarven-maze.jpg"
        />
      </a>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import CheckBox from '@/components/CheckBox.vue';
import InventoryItem from '@/components/InventoryItem.vue';
import ItemPrize from '@/components/ItemPrize.vue';
import NumberField from '@/components/NumberField.vue';

import { titleCase } from '@/helpers/index.js';

export default {
  components: {
    CheckBox,
    ItemPrize,
    InventoryItem,
    NumberField
  },
  data: function () {
    return {
      version: '1.1.6',
      inventory: {
        filters: {
          showAvailable: true,
          showUnavailable: false,
          showRupees: true,
          gems: {
            pink: true,
            purple: true,
            yellow: true,
            cyan: true,
            green: true,
            white: true,
            red: true,
            blue: true,
            black: true
          }
        },
        bag: 1,
        bow: 0,
        gloves: 0,
        shield: 0,
        sword: 1,
        tunic: 1,
        booleans: {
          'quiver': false,
          'bomb-bag': false,
          'gem-bag': false,
          'cape': false,
          'lamp': false,
          'pendant-of-cures': false,
          'pendant-of-direction': false,
          'pendant-of-health': false,
          'pendant-of-magic': false,
          'pendant-of-protection': false,
          'pendant-of-revival': false,
          'pendant-of-secrets': false,
          'pendant-of-wealth': false,
          'rod-of-bombs': false,
          'rod-of-fire': false,
          'rod-of-hearts': false,
          'rod-of-ice': false,
          'rod-of-rupees': false,
          'rod-of-stone': false,
          'ring-of-arrows': false,
          'ring-of-bombs': false,
          'ring-of-hearts': false,
          'ring-of-rupees': false
        },
        gems: {
          pink: 0,
          purple: 0,
          yellow: 0,
          cyan: 0,
          green: 0,
          white: 0,
          red: 0,
          blue: 0,
          black: 0
        }
      }
    };
  },
  methods: {
    titleCase
  },
  computed: {
    prizePool: function () {
      return [
        {
          itemA: 'red',
          itemB: 'red',
          prize: 'heart'
        },
        {
          itemA: 'black',
          itemB: 'black',
          prize: this.swordPrize
        },
        {
          itemA: 'blue',
          itemB: 'blue',
          prize: this.inventoryPrize
        },
        {
          itemA: 'black',
          itemB: 'yellow',
          prize: 'pendant-of-cures'
        },
        {
          itemA: 'black',
          itemB: 'white',
          prize: 'pendant-of-revival'
        },
        {
          itemA: 'black',
          itemB: 'purple',
          prize: 'pendant-of-direction'
        },
        {
          itemA: 'black',
          itemB: 'cyan',
          prize: 'pendant-of-protection'
        },
        {
          itemA: 'red',
          itemB: 'blue',
          prize: 'cape'
        },
        {
          itemA: 'black',
          itemB: 'green',
          prize: 'pendant-of-wealth'
        },
        {
          itemA: 'white',
          itemB: 'blue',
          prize: this.shieldPrize
        },
        {
          itemA: 'white',
          itemB: 'red',
          prize: this.glovePrize
        },
        {
          itemA: 'green',
          itemB: 'blue',
          prize: this.tunicPrize
        },
        {
          itemA: 'purple',
          itemB: 'green',
          prize: 'potion-pink'
        },
        {
          itemA: 'cyan',
          itemB: 'blue',
          prize: 'bomb-bag'
        },
        {
          itemA: 'green',
          itemB: 'red',
          prize: 'gem-bag'
        },
        {
          itemA: 'purple',
          itemB: 'red',
          prize: 'rod-of-hearts'
        },
        {
          itemA: 'green',
          itemB: 'green',
          prize: 'rod-of-rupees'
        },
        {
          itemA: 'green',
          itemB: 'white',
          prize: 'ring-of-rupees'
        },
        {
          itemA: 'yellow',
          itemB: 'blue',
          prize: 'lamp'
        },
        {
          itemA: 'pink',
          itemB: 'blue',
          prize: 'potion-blue'
        },
        {
          itemA: 'white',
          itemB: 'white',
          prize: this.bowPrize
        },
        {
          itemA: 'cyan',
          itemB: 'red',
          prize: 'quiver'
        },
        {
          itemA: 'purple',
          itemB: 'white',
          prize: 'ring-of-hearts'
        },
        {
          itemA: 'yellow',
          itemB: 'white',
          prize: 'ring-of-arrows'
        },
        {
          itemA: 'cyan',
          itemB: 'white',
          prize: 'ring-of-bombs'
        },
        {
          itemA: 'cyan',
          itemB: 'green',
          prize: 'rod-of-bombs'
        },
        {
          itemA: 'pink',
          itemB: 'red',
          prize: 'potion-red'
        },
        {
          itemA: 'purple',
          itemB: 'purple',
          prize: 'fairy-orb'
        },
        {
          itemA: 'pink',
          itemB: 'white',
          prize: 'potion-white'
        },
        {
          itemA: 'cyan',
          itemB: 'cyan',
          prize: 'ice-orb',
          amount: 5
        },
        {
          itemA: 'yellow',
          itemB: 'yellow',
          prize: 'fire-orb',
          amount: 4
        },
        {
          itemA: 'black',
          itemB: 'red',
          prize: 'pendant-of-health'
        },
        {
          itemA: 'black',
          itemB: 'blue',
          prize: 'pendant-of-secrets'
        },
        {
          itemA: 'black',
          itemB: 'pink',
          prize: 'pendant-of-magic'
        },
        {
          itemA: 'purple',
          itemB: 'blue',
          prize: 'rod-of-ice'
        },
        {
          itemA: 'yellow',
          itemB: 'green',
          prize: 'rod-of-stone'
        },
        {
          itemA: 'yellow',
          itemB: 'red',
          prize: 'rod-of-fire'
        },
        {
          itemA: 'purple',
          itemB: 'cyan',
          prize: 'bomb',
          amount: 10
        },
        {
          itemA: 'pink',
          itemB: 'green',
          prize: 'potion-green'
        },
        {
          itemA: 'yellow',
          itemB: 'cyan',
          prize: 'magic',
          amount: 2
        },
        {
          itemA: 'pink',
          itemB: 'cyan',
          prize: 'food-burger',
          amount: 2
        },
        {
          itemA: 'pink',
          itemB: 'yellow',
          prize: 'can',
          amount: 3
        },
        {
          itemA: 'pink',
          itemB: 'purple',
          prize: 'food-muffin',
          amount: 2
        },
        {
          itemA: 'pink',
          itemB: 'pink',
          prize: 'can',
          amount: 2
        },
        {
          itemA: 'purple',
          itemB: 'yellow',
          prize: 'arrows',
          amount: 60
        }
      ];
    },
    bowPrize: function () {
      const bowLevel = this.inventory.bow;
      if (this.version === '1.1.6') {
        if (bowLevel === 0) {
          return 'bow1';
        } else {
          return 'rupee';
        }
      }
      if (bowLevel === 2) {
        return 'rupee';
      }
      return 'bow' + (bowLevel + 1);
    },
    glovePrize: function () {
      const glovesLevel = this.inventory.gloves;
      if (glovesLevel === 3) {
        return 'rupee'
      }
      return 'gloves' + (glovesLevel + 1);
    },
    inventoryPrize: function () {
      const inventoryLevel = this.inventory.bag;
      if (inventoryLevel === 3) {
        return 'rupee';
      }
      return 'bag' + (inventoryLevel + 1);
    },
    shieldPrize: function () {
      const shieldLevel = this.inventory.shield;
      if (shieldLevel === 4) {
        return 'rupee';
      }
      return 'shield' + (shieldLevel + 1);
    },
    swordPrize: function () {
      const swordLevel = this.inventory.sword;
      if (swordLevel === 6) {
        return 'rupee';
      }
      return 'sword' + (swordLevel + 1)
    },
    tunicPrize: function () {
      const tunicLevel = this.inventory.tunic;
      if (tunicLevel === 4) {
        return 'rupee';
      }
      return 'tunic' + (tunicLevel + 1);
    }
  }
};
</script>
