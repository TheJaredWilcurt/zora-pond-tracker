<template>
  <div>
    <header>
      <h1>
        Zora Pond<br>
        Item Tracker
      </h1>
      <h2>
        For Dungeons of Infinity
        <select v-model="version">
          <option version="1.1.6">1.1.6</option>
          <option version="1.2.0">1.2.0</option>
        </select>
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
        <img
          v-for="(bool, item) in inventory.booleans"
          :alt="titleCase(item)"
          class="sub-item pointer"
          :data-selected="bool"
          role="button"
          tabindex="0"
          :src="'/zora-pond-tracker/sprites/1.1.6/' + item + '.png'"
          @click="inventory.booleans[item] = !inventory.booleans[item]"
          @keydown.prevent.space="inventory.booleans[item] = !inventory.booleans[item]"
          @keyup.prevent.enter="inventory.booleans[item] = !inventory.booleans[item]"
        >
      </div>
    </section>

    <h3>Possible Rewards</h3>
    <section>
      <div class="filters">
        <check-box v-model="inventory.filters.showAvailable">Show Available</check-box>
        <check-box v-model="inventory.filters.showUnavailable">Show Unavailable</check-box>
        <check-box v-model="inventory.filters.showRupees">Show Rupees</check-box>
        <img
          v-for="(bool, item) in inventory.filters.gems"
          :alt="titleCase(item + '-gem')"
          class="sub-item small pointer"
          :data-selected="bool"
          role="button"
          tabindex="0"
          :src="'/zora-pond-tracker/sprites/1.1.6/gem-' + item + '.png'"
          @click="inventory.filters.gems[item] = !inventory.filters.gems[item]"
          @keydown.prevent.space="inventory.filters.gems[item] = !inventory.filters.gems[item]"
          @keyup.prevent.enter="inventory.filters.gems[item] = !inventory.filters.gems[item]"
        >
      </div>
      <item-prize :v="inventory" a="red"    b="red"    i="heart"             ></item-prize>
      <item-prize :v="inventory" a="black"  b="black" :i="swordPrize"        ></item-prize>
      <item-prize :v="inventory" a="blue"   b="blue"  :i="inventoryPrize"    ></item-prize>
      <item-prize :v="inventory" a="black"  b="yellow" i="pendant-of-cures"  ></item-prize>
      <item-prize :v="inventory" a="black"  b="white"  i="pendant-of-revival"></item-prize>
      <item-prize :v="inventory" a="black" b="purple" i="pendant-of-direction"></item-prize>
      <item-prize :v="inventory" a="black" b="cyan" i="pendant-of-protection"></item-prize>
      <item-prize :v="inventory" a="red"    b="blue"   i="cape"              ></item-prize>
      <item-prize :v="inventory" a="black"  b="green"  i="pendant-of-wealth" ></item-prize>
      <item-prize :v="inventory" a="white"  b="blue"  :i="shieldPrize"       ></item-prize>
      <item-prize :v="inventory" a="white"  b="red"   :i="glovePrize"        ></item-prize>
      <item-prize :v="inventory" a="green"  b="blue"  :i="tunicPrize"        ></item-prize>
      <item-prize :v="inventory" a="purple" b="green"  i="potion-pink"       ></item-prize>
      <item-prize :v="inventory" a="cyan"   b="blue"   i="bomb-bag"          ></item-prize>
      <item-prize :v="inventory" a="green"  b="red"    i="gem-bag"           ></item-prize>
      <item-prize :v="inventory" a="purple" b="red"    i="rod-of-hearts"     ></item-prize>
      <item-prize :v="inventory" a="green"  b="green"  i="rod-of-rupees"     ></item-prize>
      <item-prize :v="inventory" a="green"  b="white"  i="ring-of-rupees"    ></item-prize>
      <item-prize :v="inventory" a="yellow" b="blue"   i="lamp"              ></item-prize>
      <item-prize :v="inventory" a="pink"   b="blue"   i="potion-blue"       ></item-prize>
      <item-prize :v="inventory" a="white"  b="white" :i="bowPrize"          ></item-prize>
      <item-prize :v="inventory" a="cyan"   b="red"    i="quiver"            ></item-prize>
      <item-prize :v="inventory" a="purple" b="white"  i="ring-of-hearts"    ></item-prize>
      <item-prize :v="inventory" a="yellow" b="white"  i="ring-of-arrows"    ></item-prize>
      <item-prize :v="inventory" a="cyan"   b="white"  i="ring-of-bombs"     ></item-prize>
      <item-prize :v="inventory" a="cyan"   b="green"  i="rod-of-bombs"      ></item-prize>
      <item-prize :v="inventory" a="pink"   b="red"    i="potion-red"        ></item-prize>
      <item-prize :v="inventory" a="purple" b="purple" i="fairy-orb"         ></item-prize>
      <item-prize :v="inventory" a="pink"   b="white"  i="potion-white"      ></item-prize>
      <item-prize :v="inventory" a="cyan"   b="cyan"   i="ice-orb"     n="5" ></item-prize>
      <item-prize :v="inventory" a="yellow" b="yellow" i="fire-orb"    n="4" ></item-prize>
      <item-prize :v="inventory" a="black"  b="red"    i="pendant-of-health" ></item-prize>
      <item-prize :v="inventory" a="black"  b="blue"   i="pendant-of-secrets"></item-prize>
      <item-prize :v="inventory" a="black"  b="pink"   i="pendant-of-magic"  ></item-prize>
      <item-prize :v="inventory" a="purple" b="blue"   i="rod-of-ice"        ></item-prize>
      <item-prize :v="inventory" a="yellow" b="green"  i="rod-of-stone"      ></item-prize>
      <item-prize :v="inventory" a="yellow" b="red"    i="rod-of-fire"       ></item-prize>
      <item-prize :v="inventory" a="purple" b="cyan"   i="bomb"        n="10"></item-prize>
      <item-prize :v="inventory" a="pink"   b="green"  i="potion-green"      ></item-prize>
      <item-prize :v="inventory" a="yellow" b="cyan"   i="magic"       n="2" ></item-prize>
      <item-prize :v="inventory" a="pink"   b="cyan"   i="food-burger" n="2" ></item-prize>
      <item-prize :v="inventory" a="pink"   b="yellow" i="can"         n="3" ></item-prize>
      <item-prize :v="inventory" a="pink"   b="purple" i="food-muffin" n="2" ></item-prize>
      <item-prize :v="inventory" a="pink"   b="pink"   i="can"         n="2" ></item-prize>
      <item-prize :v="inventory" a="purple" b="yellow" i="arrows"      n="60"></item-prize>
    </section>

    <h3>Dwarven Maze</h3>
    <section>
      <a
        href="/zora-pond-tracker/dwarven-maze.jpg"
        target="_blank"
        style="display: inline-block;"
      >
        <img src="/zora-pond-tracker/dwarven-maze.jpg" class="maze" alt="Dwarven Maze Map">
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
